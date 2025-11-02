"use server";

import { db, schema } from '@/db';
import { eq, desc, like, or, sql } from 'drizzle-orm';

export async function getHotels(search = '', page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;

    let query = db.select({
      id: schema.hotels.id,
      code: schema.hotels.code,
      name: schema.hotels.name,
      address: schema.hotels.address,
      phone: schema.hotels.phone,
      email: schema.hotels.email,
      contactPerson: schema.hotels.contactPerson,
      commissionRate: schema.hotels.commissionRate,
      isActive: schema.hotels.isActive,
      qrCodeUrl: schema.hotels.qrCodeUrl,
      ownerId: schema.hotels.ownerId,
      createdAt: schema.hotels.createdAt,
      updatedAt: schema.hotels.updatedAt,
      owner: {
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        phone: schema.users.phone
      }
    })
    .from(schema.hotels)
    .leftJoin(schema.users, eq(schema.hotels.ownerId, schema.users.id));

    if (search) {
      query = query.where(
        or(
          like(schema.hotels.name, `%${search}%`),
          like(schema.hotels.code, `%${search}%`),
          like(schema.hotels.email, `%${search}%`),
          like(schema.hotels.phone, `%${search}%`),
          like(schema.hotels.contactPerson, `%${search}%`),
          like(schema.users.name, `%${search}%`)
        )
      );
    }

    const countQuery = db.select({ count: schema.hotels.id }).from(schema.hotels)
      .leftJoin(schema.users, eq(schema.hotels.ownerId, schema.users.id));

    if (search) {
      countQuery.where(
        or(
          like(schema.hotels.name, `%${search}%`),
          like(schema.hotels.code, `%${search}%`),
          like(schema.hotels.email, `%${search}%`),
          like(schema.hotels.phone, `%${search}%`),
          like(schema.hotels.contactPerson, `%${search}%`),
          like(schema.users.name, `%${search}%`)
        )
      );
    }

    const [hotels, totalResult] = await Promise.all([
      query.orderBy(desc(schema.hotels.createdAt)).limit(limit).offset(offset),
      countQuery
    ]);

    const total = totalResult.length;

    return {
      success: true,
      data: hotels,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return {
      success: false,
      error: error.message,
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
    };
  }
}

export async function getHotelById(id) {
  try {
    const hotel = await db.select().from(schema.hotels).where(eq(schema.hotels.id, id)).limit(1);

    if (hotel.length === 0) {
      return { success: false, error: 'Hotel not found' };
    }

    return { success: true, data: hotel[0] };
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return { success: false, error: error.message };
  }
}

export async function createHotel(hotelData) {
  try {
    if (!hotelData.code || !hotelData.name || !hotelData.address || !hotelData.phone) {
      return { success: false, error: 'Code, name, address, and phone are required' };
    }

    const id = crypto.randomUUID();
    const newHotel = {
      id,
      code: hotelData.code,
      name: hotelData.name,
      address: hotelData.address,
      phone: hotelData.phone,
      email: hotelData.email || null,
      contactPerson: hotelData.contactPerson || null,
      commissionRate: hotelData.commissionRate || "0.00",
      isActive: hotelData.isActive ?? true,
      qrCodeUrl: hotelData.qrCodeUrl || null,
      ownerId: hotelData.ownerId || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.insert(schema.hotels).values(newHotel);

    const insertedHotel = await db
      .select({
        id: schema.hotels.id,
        code: schema.hotels.code,
        name: schema.hotels.name,
        address: schema.hotels.address,
        phone: schema.hotels.phone,
        email: schema.hotels.email,
        contactPerson: schema.hotels.contactPerson,
        commissionRate: schema.hotels.commissionRate,
        isActive: schema.hotels.isActive,
        qrCodeUrl: schema.hotels.qrCodeUrl,
        ownerId: schema.hotels.ownerId,
        createdAt: schema.hotels.createdAt,
        updatedAt: schema.hotels.updatedAt,
        owner: {
          id: schema.users.id,
          name: schema.users.name,
          email: schema.users.email,
          phone: schema.users.phone
        }
      })
      .from(schema.hotels)
      .leftJoin(schema.users, eq(schema.hotels.ownerId, schema.users.id))
      .where(eq(schema.hotels.id, id))
      .limit(1);

    return { success: true, data: insertedHotel[0] };
  } catch (error) {
    console.error('Error creating hotel:', error);
    return { success: false, error: error.message };
  }
}

export async function updateHotel(id, hotelData) {
  try {
    const existingHotel = await db
      .select()
      .from(schema.hotels)
      .where(eq(schema.hotels.id, id))
      .limit(1);

    if (!existingHotel || existingHotel.length === 0) {
      return { success: false, error: 'Hotel not found' };
    }

    const updateData = {
      code: hotelData.code,
      name: hotelData.name,
      address: hotelData.address,
      phone: hotelData.phone,
      email: hotelData.email || null,
      contactPerson: hotelData.contactPerson || null,
      commissionRate: hotelData.commissionRate || "0.00",
      isActive: hotelData.isActive ?? true,
      qrCodeUrl: hotelData.qrCodeUrl || null,
      ownerId: hotelData.ownerId || null,
      updatedAt: new Date()
    };

    await db
      .update(schema.hotels)
      .set(updateData)
      .where(eq(schema.hotels.id, id));

    const updatedHotel = await db
      .select({
        id: schema.hotels.id,
        code: schema.hotels.code,
        name: schema.hotels.name,
        address: schema.hotels.address,
        phone: schema.hotels.phone,
        email: schema.hotels.email,
        contactPerson: schema.hotels.contactPerson,
        commissionRate: schema.hotels.commissionRate,
        isActive: schema.hotels.isActive,
        qrCodeUrl: schema.hotels.qrCodeUrl,
        ownerId: schema.hotels.ownerId,
        createdAt: schema.hotels.createdAt,
        updatedAt: schema.hotels.updatedAt,
        owner: {
          id: schema.users.id,
          name: schema.users.name,
          email: schema.users.email,
          phone: schema.users.phone
        }
      })
      .from(schema.hotels)
      .leftJoin(schema.users, eq(schema.hotels.ownerId, schema.users.id))
      .where(eq(schema.hotels.id, id))
      .limit(1);

    if (!updatedHotel || updatedHotel.length === 0) {
      return { success: false, error: 'Hotel not found after update' };
    }

    return { success: true, data: updatedHotel[0] };
  } catch (error) {
    console.error('Error updating hotel:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteHotel(id) {
  try {
    const hotelToDelete = await db
      .select()
      .from(schema.hotels)
      .where(eq(schema.hotels.id, id))
      .limit(1);

    if (!hotelToDelete || hotelToDelete.length === 0) {
      return { success: false, error: 'Hotel not found' };
    }

    await db
      .delete(schema.hotels)
      .where(eq(schema.hotels.id, id));

    return { success: true, data: hotelToDelete[0] };
  } catch (error) {
    console.error('Error deleting hotel:', error);
    return { success: false, error: error.message };
  }
}

export async function toggleHotelStatus(id) {
  try {
    const hotelResult = await db
      .select({ isActive: schema.hotels.isActive })
      .from(schema.hotels)
      .where(eq(schema.hotels.id, id))
      .limit(1);

    if (!hotelResult || hotelResult.length === 0) {
      return { success: false, error: 'Hotel not found' };
    }

    const hotel = hotelResult[0];
    const newStatus = !hotel.isActive;

    await db
      .update(schema.hotels)
      .set({
        isActive: newStatus,
        updatedAt: new Date()
      })
      .where(eq(schema.hotels.id, id));

    const updatedHotel = await db
      .select()
      .from(schema.hotels)
      .where(eq(schema.hotels.id, id))
      .limit(1);

    return { success: true, data: updatedHotel[0] };
  } catch (error) {
    console.error('Error toggling hotel status:', error);
    return { success: false, error: error.message };
  }
}

export async function getHotelsByStatus(isActive) {
  try {
    const hotels = await db
      .select()
      .from(schema.hotels)
      .where(eq(schema.hotels.isActive, isActive))
      .orderBy(desc(schema.hotels.createdAt));

    return { success: true, data: hotels };
  } catch (error) {
    console.error('Error fetching hotels by status:', error);
    return { success: false, error: error.message, data: [] };
  }
}

export async function getHotelsWithHighCommission(minCommission = 10) {
  try {
    const hotels = await db
      .select()
      .from(schema.hotels)
      .where(sql`${schema.hotels.commissionRate} >= ${minCommission}`)
      .orderBy(desc(schema.hotels.commissionRate));

    return { success: true, data: hotels };
  } catch (error) {
    console.error('Error fetching hotels with high commission:', error);
    return { success: false, error: error.message, data: [] };
  }
}

export async function getMitraUsers() {
  try {
    const mitraUsers = await db
      .select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        phone: schema.users.phone,
        isActive: schema.users.isActive,
        currentHotelId: schema.users.currentHotelId
      })
      .from(schema.users)
      .where(eq(schema.users.role, 'mitra'))
      .orderBy(schema.users.name);

    return { success: true, data: mitraUsers };
  } catch (error) {
    console.error('Error fetching mitra users:', error);
    return { success: false, error: error.message, data: [] };
  }
}