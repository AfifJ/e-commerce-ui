"use server";

import { db, schema } from '@/db';
import { eq, desc, like, or } from 'drizzle-orm';
import { auth } from '@/lib/auth';

// Helper function to handle Better Auth responses
function handleBetterAuthResponse(result, operation) {
  console.log(`Better Auth ${operation} result:`, result);

  if (result.error) {
    console.error(`Better Auth ${operation} error:`, result.error);
    const errorMessage = result.error.message || result.error.status || `Failed to ${operation} user`;
    return {
      success: false,
      error: errorMessage
    };
  }

  console.log(`Better Auth ${operation} success:`, result.data);
  return {
    success: true,
    data: result.data
  };
}

// Get all users with optional search and pagination
export async function getUsers(search = '', page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;

    let query = db.select({
      id: schema.users.id,
      username: schema.users.username,
      email: schema.users.email,
      emailVerified: schema.users.emailVerified,
      name: schema.users.name,
      phone: schema.users.phone,
      phoneVerified: schema.users.phoneVerified,
      verificationCode: schema.users.verificationCode,
      image: schema.users.image,
      role: schema.users.role,
      isActive: schema.users.isActive,
      lastLogin: schema.users.lastLogin,
      currentHotelId: schema.users.currentHotelId,
      createdAt: schema.users.createdAt,
      updatedAt: schema.users.updatedAt,
      hotel: {
        id: schema.hotels.id,
        name: schema.hotels.name,
        code: schema.hotels.code
      }
    })
    .from(schema.users)
    .leftJoin(schema.hotels, eq(schema.users.currentHotelId, schema.hotels.id));

    // Add search filter if provided
    if (search) {
      query = query.where(
        or(
          like(schema.users.name, `%${search}%`),
          like(schema.users.email, `%${search}%`),
          like(schema.users.username, `%${search}%`),
          like(schema.users.phone, `%${search}%`),
          like(schema.hotels.name, `%${search}%`)
        )
      );
    }

    // Get total count for pagination
    const countQuery = db.select({ count: schema.users.id }).from(schema.users)
      .leftJoin(schema.hotels, eq(schema.users.currentHotelId, schema.hotels.id));
    if (search) {
      countQuery.where(
        or(
          like(schema.users.name, `%${search}%`),
          like(schema.users.email, `%${search}%`),
          like(schema.users.username, `%${search}%`),
          like(schema.users.phone, `%${search}%`),
          like(schema.hotels.name, `%${search}%`)
        )
      );
    }

    const [users, totalResult] = await Promise.all([
      query.orderBy(desc(schema.users.createdAt)).limit(limit).offset(offset),
      countQuery
    ]);

    const total = totalResult.length;

    console.log('Fetched users from database:', users);

    return {
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      success: false,
      error: error.message,
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
    };
  }
}

// Get user by ID
export async function getUserById(id) {
  try {
    const user = await db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1);

    if (user.length === 0) {
      return { success: false, error: 'User not found' };
    }

    return { success: true, data: user[0] };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { success: false, error: error.message };
  }
}

// Create new user using Better Auth API
export async function createUser(userData) {
  try {
    // Validate required fields
    if (!userData.password) {
      return { success: false, error: 'Password is required for new users' };
    }

    console.log('Creating user via Better Auth:', userData);

    // Use Better Auth API for admin user creation
    const result = await auth.api.signUpEmail({
      body: {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        username: userData.username,
        phone: userData.phone,
        role: userData.role || 'customer',
        image: userData.image || null,
        isActive: userData.isActive ?? true,
        emailVerified: userData.emailVerified ?? false,
        phoneVerified: userData.phoneVerified ?? false,
        currentHotelId: userData.currentHotelId || null,
      }
    });

    return handleBetterAuthResponse(result, 'create');
  } catch (error) {
    console.error('Error creating user:', error);

    // Fallback to database creation if Better Auth fails
    try {
      console.log('Falling back to database creation...');

      const id = crypto.randomUUID();
      const newUser = {
        id,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role || 'customer',
        image: userData.image || null,
        isActive: userData.isActive ?? true,
        emailVerified: userData.emailVerified ?? false,
        phoneVerified: userData.phoneVerified ?? false,
        currentHotelId: userData.currentHotelId || null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const [insertedUser] = await db.insert(schema.users).values(newUser).returning();

      console.log('User created successfully via database fallback:', insertedUser);
      return { success: true, data: insertedUser };
    } catch (fallbackError) {
      console.error('Fallback creation also failed:', fallbackError);
      return { success: false, error: fallbackError.message };
    }
  }
}

// Update user using Better Auth API
export async function updateUser(id, userData) {
  try {
    console.log('Updating user:', id, userData);

    // Prepare update data for Better Auth
    const updateData = {
      ...userData
    };

    // Remove fields that shouldn't be sent to Better Auth
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    delete updateData.confirmPassword; // Only send password if provided

    console.log('Prepared update data for Better Auth:', updateData);

    // Use Better Auth admin API to update user
    const result = await auth.api.updateUser({
      body: {
        userId: id,
        ...updateData
      }
    });

    return handleBetterAuthResponse(result, 'update');
  } catch (error) {
    console.error('Error updating user:', error);

    // Fallback to database update if Better Auth fails
    try {
      console.log('Falling back to database update...');

      const updateData = {
        ...userData,
        updatedAt: new Date()
      };

      // Remove fields that shouldn't be updated directly
      delete updateData.id;
      delete updateData.createdAt;
      delete updateData.updatedAt;
      delete updateData.password;
      delete updateData.confirmPassword;

      // Fix: Use proper Drizzle MySQL syntax
      const updateResult = await db
        .update(schema.users)
        .set(updateData)
        .where(eq(schema.users.id, id));

      console.log('Database update result:', updateResult);

      // Fetch the updated user to return
      const updatedUser = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, id))
        .limit(1);

      if (!updatedUser || updatedUser.length === 0) {
        return { success: false, error: 'User not found' };
      }

      console.log('User updated successfully via database fallback:', updatedUser[0]);
      return { success: true, data: updatedUser[0] };
    } catch (fallbackError) {
      console.error('Fallback update also failed:', fallbackError);
      return { success: false, error: fallbackError.message };
    }
  }
}

// Delete user using database (since Better Auth doesn't have admin delete endpoint)
export async function deleteUser(id) {
  try {
    // First get the user to return after deletion
    const userToDelete = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    if (!userToDelete || userToDelete.length === 0) {
      return { success: false, error: 'User not found' };
    }

    // Delete the user
    const deleteResult = await db
      .delete(schema.users)
      .where(eq(schema.users.id, id));

    console.log('Database delete result:', deleteResult);

    return { success: true, data: userToDelete[0] };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: error.message };
  }
}

// Toggle user active status using database
export async function toggleUserStatus(id) {
  try {
    // First get current user status
    const userResult = await db
      .select({ isActive: schema.users.isActive })
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    if (!userResult || userResult.length === 0) {
      return { success: false, error: 'User not found' };
    }

    const user = userResult[0];
    const newStatus = !user.isActive;

    // Update the active status
    const updateResult = await db
      .update(schema.users)
      .set({
        isActive: newStatus,
        updatedAt: new Date()
      })
      .where(eq(schema.users.id, id));

    console.log('Toggle status update result:', updateResult);

    // Fetch the updated user
    const updatedUser = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    return { success: true, data: updatedUser[0] };
  } catch (error) {
    console.error('Error toggling user status:', error);
    return { success: false, error: error.message };
  }
}

// Update user verifications using database
export async function updateUserVerifications(id, emailVerified, phoneVerified) {
  try {
    const [updatedUser] = await db
      .update(schema.users)
      .set({
        emailVerified,
        phoneVerified,
        updatedAt: new Date()
      })
      .where(eq(schema.users.id, id))
      .returning();

    if (!updatedUser) {
      return { success: false, error: 'User not found' };
    }

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Error updating user verifications:', error);
    return { success: false, error: error.message };
  }
}

// Get users by role
export async function getUsersByRole(role) {
  try {
    const users = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.role, role))
      .orderBy(desc(schema.users.createdAt));

    return { success: true, data: users };
  } catch (error) {
    console.error('Error fetching users by role:', error);
    return { success: false, error: error.message, data: [] };
  }
}

// Assign hotel to mitra user
export async function assignHotelToUser(userId, hotelId) {
  try {
    // Validate that user exists and has mitra role
    const userResult = await db
      .select({ role: schema.users.role })
      .from(schema.users)
      .where(eq(schema.users.id, userId))
      .limit(1);

    if (!userResult || userResult.length === 0) {
      return { success: false, error: 'User not found' };
    }

    const user = userResult[0];
    if (user.role !== 'mitra') {
      return { success: false, error: 'Only mitra users can be assigned to hotels' };
    }

    // Update user's currentHotelId
    const updateResult = await db
      .update(schema.users)
      .set({
        currentHotelId: hotelId || null,
        updatedAt: new Date()
      })
      .where(eq(schema.users.id, userId));

    console.log('Hotel assignment update result:', updateResult);

    // Fetch updated user with hotel data
    const updatedUser = await db
      .select({
        id: schema.users.id,
        username: schema.users.username,
        email: schema.users.email,
        name: schema.users.name,
        phone: schema.users.phone,
        role: schema.users.role,
        isActive: schema.users.isActive,
        currentHotelId: schema.users.currentHotelId,
        hotel: {
          id: schema.hotels.id,
          name: schema.hotels.name,
          code: schema.hotels.code
        }
      })
      .from(schema.users)
      .leftJoin(schema.hotels, eq(schema.users.currentHotelId, schema.hotels.id))
      .where(eq(schema.users.id, userId))
      .limit(1);

    if (!updatedUser || updatedUser.length === 0) {
      return { success: false, error: 'User not found after update' };
    }

    return { success: true, data: updatedUser[0] };
  } catch (error) {
    console.error('Error assigning hotel to user:', error);
    return { success: false, error: error.message };
  }
}

// Get available hotels for assignment
export async function getAvailableHotels() {
  try {
    const hotels = await db
      .select({
        id: schema.hotels.id,
        name: schema.hotels.name,
        code: schema.hotels.code,
        isActive: schema.hotels.isActive
      })
      .from(schema.hotels)
      .where(eq(schema.hotels.isActive, true))
      .orderBy(schema.hotels.name);

    return { success: true, data: hotels };
  } catch (error) {
    console.error('Error fetching available hotels:', error);
    return { success: false, error: error.message, data: [] };
  }
}