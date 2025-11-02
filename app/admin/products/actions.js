"use server";

import { db, schema } from '@/db';
import { eq, desc, like, or, sql, count, sum, avg } from 'drizzle-orm';

// Get all products with related data
export async function getProducts(search = '', page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;

    // Base query for products with related data
    let query = db.select({
      // Product fields
      id: schema.products.id,
      name: schema.products.name,
      slug: schema.products.slug,
      description: schema.products.description,
      shortDescription: schema.products.shortDescription,
      categoryId: schema.products.categoryId,
      vendorId: schema.products.vendorId,
      buyPrice: schema.products.buyPrice,
      sellPrice: schema.products.sellPrice,
      margin: schema.products.margin,
      commissionRate: schema.products.commissionRate,
      sku: schema.products.sku,
      weight: schema.products.weight,
      images: schema.products.images,
      isActive: schema.products.isActive,
      isFeatured: schema.products.isFeatured,
      metaTitle: schema.products.metaTitle,
      metaDescription: schema.products.metaDescription,
      createdAt: schema.products.createdAt,
      updatedAt: schema.products.updatedAt,

      // Related data
      categoryName: schema.categories.name,
      vendorName: schema.users.name,
      vendorUsername: schema.users.username,
      vendorEmail: schema.users.email,

      // Inventory data
      currentStock: schema.inventory.currentStock,
      reservedStock: schema.inventory.reservedStock,
      minStock: schema.inventory.minStock,

      // Review metrics with proper NULL safety
      averageRating: sql`COALESCE(AVG(CAST(${schema.productReviews.rating} AS DECIMAL(2,1))), 0)`.mapWith(Number),
      totalReviews: count(schema.productReviews.id).mapWith(Number),

      // Sales metrics (placeholder for future integration)
      totalSold: sql`0`.mapWith(Number),
      borrowedStock: sql`0`.mapWith(Number)
    })
    .from(schema.products)
    .leftJoin(schema.categories, eq(schema.products.categoryId, schema.categories.id))
    .leftJoin(schema.users, eq(schema.products.vendorId, schema.users.id))
    .leftJoin(schema.inventory, eq(schema.products.id, schema.inventory.productId))
    .leftJoin(schema.productReviews, eq(schema.products.id, schema.productReviews.productId));

    // Add search filter if provided
    if (search) {
      query = query.where(
        or(
          like(schema.products.name, `%${search}%`),
          like(schema.products.slug, `%${search}%`),
          like(schema.products.sku, `%${search}%`),
          like(schema.products.description, `%${search}%`),
          like(schema.categories.name, `%${search}%`),
          like(schema.users.name, `%${search}%`)
        )
      );
    }

    // Group by product fields and order
    query = query.groupBy(
      schema.products.id,
      schema.categories.name,
      schema.users.name,
      schema.users.username,
      schema.users.email,
      schema.inventory.currentStock,
      schema.inventory.reservedStock,
      schema.inventory.minStock
    ).orderBy(desc(schema.products.createdAt));

    // Get total count for pagination
    const countQuery = db.select({ count: count() })
      .from(schema.products)
      .leftJoin(schema.categories, eq(schema.products.categoryId, schema.categories.id))
      .leftJoin(schema.users, eq(schema.products.vendorId, schema.users.id));

    if (search) {
      countQuery.where(
        or(
          like(schema.products.name, `%${search}%`),
          like(schema.products.slug, `%${search}%`),
          like(schema.products.sku, `%${search}%`),
          like(schema.products.description, `%${search}%`),
          like(schema.categories.name, `%${search}%`),
          like(schema.users.name, `%${search}%`)
        )
      );
    }

    const [products, totalResult] = await Promise.all([
      query.limit(limit).offset(offset),
      countQuery
    ]);

    const total = totalResult[0]?.count || 0;

    return {
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      success: false,
      error: error.message,
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
    };
  }
}

// Get product by ID
export async function getProductById(id) {
  try {
    const product = await db.select({
      // Product fields
      id: schema.products.id,
      name: schema.products.name,
      slug: schema.products.slug,
      description: schema.products.description,
      shortDescription: schema.products.shortDescription,
      categoryId: schema.products.categoryId,
      vendorId: schema.products.vendorId,
      buyPrice: schema.products.buyPrice,
      sellPrice: schema.products.sellPrice,
      margin: schema.products.margin,
      commissionRate: schema.products.commissionRate,
      sku: schema.products.sku,
      weight: schema.products.weight,
      images: schema.products.images,
      isActive: schema.products.isActive,
      isFeatured: schema.products.isFeatured,
      metaTitle: schema.products.metaTitle,
      metaDescription: schema.products.metaDescription,
      createdAt: schema.products.createdAt,
      updatedAt: schema.products.updatedAt,

      // Related data
      categoryName: schema.categories.name,
      vendorName: schema.users.name,
      vendorUsername: schema.users.username,
      vendorEmail: schema.users.email,

      // Inventory data
      currentStock: schema.inventory.currentStock,
      reservedStock: schema.inventory.reservedStock,
      minStock: schema.inventory.minStock,

      // Review metrics
      averageRating: sql`COALESCE(AVG(CAST(${schema.productReviews.rating} AS DECIMAL(2,1))), 0)`.mapWith(Number),
      totalReviews: count(schema.productReviews.id).mapWith(Number)
    })
    .from(schema.products)
    .leftJoin(schema.categories, eq(schema.products.categoryId, schema.categories.id))
    .leftJoin(schema.users, eq(schema.products.vendorId, schema.users.id))
    .leftJoin(schema.inventory, eq(schema.products.id, schema.inventory.productId))
    .leftJoin(schema.productReviews, eq(schema.products.id, schema.productReviews.productId))
    .where(eq(schema.products.id, id))
    .groupBy(
      schema.products.id,
      schema.categories.name,
      schema.users.name,
      schema.users.username,
      schema.users.email,
      schema.inventory.currentStock,
      schema.inventory.reservedStock,
      schema.inventory.minStock
    )
    .limit(1);

    if (product.length === 0) {
      return { success: false, error: 'Product not found' };
    }

    return { success: true, data: product[0] };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { success: false, error: error.message };
  }
}

// Create new product
export async function createProduct(productData) {
  try {
    // Validate required fields
    if (!productData.name || !productData.sku || !productData.buyPrice || !productData.sellPrice) {
      return { success: false, error: 'Name, SKU, buy price, and sell price are required' };
    }

    // Check if SKU already exists
    const existingSku = await db
      .select()
      .from(schema.products)
      .where(eq(schema.products.sku, productData.sku))
      .limit(1);

    if (existingSku.length > 0) {
      return { success: false, error: 'SKU already exists' };
    }

    const id = crypto.randomUUID();
    const margin = parseFloat(productData.sellPrice) - parseFloat(productData.buyPrice);

    const newProduct = {
      id,
      name: productData.name,
      slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: productData.description || null,
      shortDescription: productData.shortDescription || null,
      categoryId: productData.categoryId || null,
      vendorId: productData.vendorId || null,
      buyPrice: productData.buyPrice,
      sellPrice: productData.sellPrice,
      margin: margin,
      commissionRate: 0, // Default to 0 since commission rate is not needed
      sku: productData.sku,
      weight: productData.weight ? parseFloat(productData.weight) : null,
      images: productData.images || [],
      isActive: productData.isActive ?? true,
      isFeatured: productData.isFeatured ?? false,
      metaTitle: productData.metaTitle || null,
      metaDescription: productData.metaDescription || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.insert(schema.products).values(newProduct);

    // Create inventory record
    await db.insert(schema.inventory).values({
      id: crypto.randomUUID(),
      productId: id,
      currentStock: productData.currentStock || 0,
      reservedStock: 0,
      minStock: productData.minStock || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Get the created product with related data
    const createdProduct = await getProductById(id);

    return { success: true, data: createdProduct.data };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: error.message };
  }
}

// Update product
export async function updateProduct(id, productData) {
  try {
    const existingProduct = await db
      .select()
      .from(schema.products)
      .where(eq(schema.products.id, id))
      .limit(1);

    if (!existingProduct || existingProduct.length === 0) {
      return { success: false, error: 'Product not found' };
    }

    // Check if SKU already exists (excluding current product)
    if (productData.sku && productData.sku !== existingProduct[0].sku) {
      const existingSku = await db
        .select()
        .from(schema.products)
        .where(eq(schema.products.sku, productData.sku))
        .limit(1);

      if (existingSku.length > 0) {
        return { success: false, error: 'SKU already exists' };
      }
    }

    const margin = parseFloat(productData.sellPrice) - parseFloat(productData.buyPrice);

    const updateData = {
      name: productData.name,
      slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: productData.description || null,
      shortDescription: productData.shortDescription || null,
      categoryId: productData.categoryId || null,
      vendorId: productData.vendorId || null,
      buyPrice: productData.buyPrice,
      sellPrice: productData.sellPrice,
      margin: margin,
      commissionRate: 0, // Default to 0 since commission rate is not needed
      sku: productData.sku,
      weight: productData.weight ? parseFloat(productData.weight) : null,
      images: productData.images || [],
      isActive: productData.isActive ?? true,
      isFeatured: productData.isFeatured ?? false,
      metaTitle: productData.metaTitle || null,
      metaDescription: productData.metaDescription || null,
      updatedAt: new Date()
    };

    await db
      .update(schema.products)
      .set(updateData)
      .where(eq(schema.products.id, id));

    // Update inventory if provided
    if (productData.currentStock !== undefined || productData.minStock !== undefined) {
      const inventoryUpdate = {};
      if (productData.currentStock !== undefined) {
        inventoryUpdate.currentStock = productData.currentStock;
      }
      if (productData.minStock !== undefined) {
        inventoryUpdate.minStock = productData.minStock;
      }
      inventoryUpdate.updatedAt = new Date();

      await db
        .update(schema.inventory)
        .set(inventoryUpdate)
        .where(eq(schema.inventory.productId, id));
    }

    // Get the updated product with related data
    const updatedProduct = await getProductById(id);

    if (!updatedProduct.success) {
      return { success: false, error: 'Product not found after update' };
    }

    return { success: true, data: updatedProduct.data };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error: error.message };
  }
}

// Delete product
export async function deleteProduct(id) {
  try {
    const productToDelete = await db
      .select()
      .from(schema.products)
      .where(eq(schema.products.id, id))
      .limit(1);

    if (!productToDelete || productToDelete.length === 0) {
      return { success: false, error: 'Product not found' };
    }

    await db
      .delete(schema.products)
      .where(eq(schema.products.id, id));

    return { success: true, data: productToDelete[0] };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: error.message };
  }
}

// Toggle product active status
export async function toggleProductStatus(id) {
  try {
    const productResult = await db
      .select({ isActive: schema.products.isActive })
      .from(schema.products)
      .where(eq(schema.products.id, id))
      .limit(1);

    if (!productResult || productResult.length === 0) {
      return { success: false, error: 'Product not found' };
    }

    const product = productResult[0];
    const newStatus = !product.isActive;

    await db
      .update(schema.products)
      .set({
        isActive: newStatus,
        updatedAt: new Date()
      })
      .where(eq(schema.products.id, id));

    const updatedProduct = await db
      .select()
      .from(schema.products)
      .where(eq(schema.products.id, id))
      .limit(1);

    return { success: true, data: updatedProduct[0] };
  } catch (error) {
    console.error('Error toggling product status:', error);
    return { success: false, error: error.message };
  }
}

// Toggle product featured status
export async function toggleProductFeatured(id) {
  try {
    const productResult = await db
      .select({ isFeatured: schema.products.isFeatured })
      .from(schema.products)
      .where(eq(schema.products.id, id))
      .limit(1);

    if (!productResult || productResult.length === 0) {
      return { success: false, error: 'Product not found' };
    }

    const product = productResult[0];
    const newStatus = !product.isFeatured;

    await db
      .update(schema.products)
      .set({
        isFeatured: newStatus,
        updatedAt: new Date()
      })
      .where(eq(schema.products.id, id));

    const updatedProduct = await db
      .select()
      .from(schema.products)
      .where(eq(schema.products.id, id))
      .limit(1);

    return { success: true, data: updatedProduct[0] };
  } catch (error) {
    console.error('Error toggling product featured status:', error);
    return { success: false, error: error.message };
  }
}

// Get categories for dropdown
export async function getCategories() {
  try {
    const categories = await db.select({
      id: schema.categories.id,
      name: schema.categories.name,
      slug: schema.categories.slug
    })
    .from(schema.categories)
    .where(eq(schema.categories.isActive, true))
    .orderBy(schema.categories.name);

    return { success: true, data: categories };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { success: false, error: error.message, data: [] };
  }
}

// Get vendors for dropdown
export async function getVendors() {
  try {
    const vendors = await db.select({
      id: schema.users.id,
      name: schema.users.name,
      username: schema.users.username,
      email: schema.users.email
    })
    .from(schema.users)
    .where(eq(schema.users.role, 'vendor'))
    .where(eq(schema.users.isActive, true))
    .orderBy(schema.users.name);

    return { success: true, data: vendors };
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return { success: false, error: error.message, data: [] };
  }
}