"use server";

import { db } from '@/db';
import { categories, products } from '@/db/schema';
import { eq, desc, like, or, sql, count } from 'drizzle-orm';

// Get all categories with product count and hierarchy data
export async function getCategories(search = '', page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;

    // Base query for categories with product count
    let query = db.select({
      // Category fields
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      image: categories.image,
      parentId: categories.parentId,
      isActive: categories.isActive,
      sortOrder: categories.sortOrder,
      createdAt: categories.createdAt,
      updatedAt: categories.updatedAt,

      // Product count
      productCount: count(products.id).mapWith(Number)
    })
    .from(categories)
    .leftJoin(products, eq(categories.id, products.categoryId));

    // Add search filter if provided
    if (search) {
      query = query.where(
        or(
          like(categories.name, `%${search}%`),
          like(categories.slug, `%${search}%`),
          like(categories.description, `%${search}%`)
        )
      );
    }

    // Group by category fields and order
    query = query.groupBy(categories.id).orderBy(categories.sortOrder, categories.name);

    // Get total count for pagination
    const countQuery = db.select({ count: count() })
      .from(categories);

    if (search) {
      countQuery.where(
        or(
          like(categories.name, `%${search}%`),
          like(categories.slug, `%${search}%`),
          like(categories.description, `%${search}%`)
        )
      );
    }

    const [categoriesData, totalResult] = await Promise.all([
      query.limit(limit).offset(offset),
      countQuery
    ]);

    const total = totalResult[0]?.count || 0;

    return {
      success: true,
      data: categoriesData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      success: false,
      error: error.message,
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
    };
  }
}

// Get category by ID
export async function getCategoryById(id) {
  try {
    const category = await db.select({
      // Category fields
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      image: categories.image,
      parentId: categories.parentId,
      isActive: categories.isActive,
      sortOrder: categories.sortOrder,
      createdAt: categories.createdAt,
      updatedAt: categories.updatedAt,

      // Product count
      productCount: count(products.id).mapWith(Number)
    })
    .from(categories)
    .leftJoin(products, eq(categories.id, products.categoryId))
    .where(eq(categories.id, id))
    .groupBy(categories.id)
    .limit(1);

    if (category.length === 0) {
      return { success: false, error: 'Category not found' };
    }

    return { success: true, data: category[0] };
  } catch (error) {
    console.error('Error fetching category:', error);
    return { success: false, error: error.message };
  }
}

// Create new category
export async function createCategory(categoryData) {
  try {
    // Validate required fields
    if (!categoryData.name) {
      return { success: false, error: 'Category name is required' };
    }

    // Check if slug already exists
    if (categoryData.slug) {
      const existingSlug = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, categoryData.slug))
        .limit(1);

      if (existingSlug.length > 0) {
        return { success: false, error: 'Slug already exists' };
      }
    }

    // Generate slug if not provided
    const slug = categoryData.slug || categoryData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if generated slug already exists
    const existingSlug = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);

    if (existingSlug.length > 0) {
      return { success: false, error: 'Slug already exists. Please provide a different name or slug.' };
    }

    const id = crypto.randomUUID();
    const newCategory = {
      id,
      name: categoryData.name,
      slug: slug,
      description: categoryData.description || null,
      image: categoryData.image || null,
      parentId: null,
      isActive: categoryData.isActive ?? true,
      sortOrder: categoryData.sortOrder || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.insert(categories).values(newCategory);

    // Get the created category with related data
    const createdCategory = await getCategoryById(id);

    return { success: true, data: createdCategory.data };
  } catch (error) {
    console.error('Error creating category:', error);
    return { success: false, error: error.message };
  }
}

// Update category
export async function updateCategory(id, categoryData) {
  try {
    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (!existingCategory || existingCategory.length === 0) {
      return { success: false, error: 'Category not found' };
    }

    // Generate slug if not provided or if name changed
    let slug = categoryData.slug;
    if (!slug || categoryData.name !== existingCategory[0].name) {
      slug = categoryData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // Check if slug already exists (excluding current category)
    if (slug !== existingCategory[0].slug) {
      const existingSlug = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, slug))
        .limit(1);

      if (existingSlug.length > 0) {
        return { success: false, error: 'Slug already exists. Please provide a different name or slug.' };
      }
    }

    const updateData = {
      name: categoryData.name,
      slug: slug,
      description: categoryData.description || null,
      image: categoryData.image || null,
      parentId: null,
      isActive: categoryData.isActive ?? true,
      sortOrder: categoryData.sortOrder || 0,
      updatedAt: new Date()
    };

    await db
      .update(categories)
      .set(updateData)
      .where(eq(categories.id, id));

    // Get the updated category with related data
    const updatedCategory = await getCategoryById(id);

    if (!updatedCategory.success) {
      return { success: false, error: 'Category not found after update' };
    }

    return { success: true, data: updatedCategory.data };
  } catch (error) {
    console.error('Error updating category:', error);
    return { success: false, error: error.message };
  }
}

// Delete category
export async function deleteCategory(id) {
  try {
    const categoryToDelete = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (!categoryToDelete || categoryToDelete.length === 0) {
      return { success: false, error: 'Category not found' };
    }

    // Check if category has products
    const productCount = await db
      .select({ count: count() })
      .from(products)
      .where(eq(products.categoryId, id));

    if (productCount[0]?.count > 0) {
      return {
        success: false,
        error: `Cannot delete category. Category has ${productCount[0].count} associated products. Please reassign or delete products first.`
      };
    }

    
    await db
      .delete(categories)
      .where(eq(categories.id, id));

    return { success: true, data: categoryToDelete[0] };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { success: false, error: error.message };
  }
}

// Toggle category active status
export async function toggleCategoryStatus(id) {
  try {
    const categoryResult = await db
      .select({ isActive: categories.isActive })
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (!categoryResult || categoryResult.length === 0) {
      return { success: false, error: 'Category not found' };
    }

    const category = categoryResult[0];
    const newStatus = !category.isActive;

    await db
      .update(categories)
      .set({
        isActive: newStatus,
        updatedAt: new Date()
      })
      .where(eq(categories.id, id));

    const updatedCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    return { success: true, data: updatedCategory[0] };
  } catch (error) {
    console.error('Error toggling category status:', error);
    return { success: false, error: error.message };
  }
}

