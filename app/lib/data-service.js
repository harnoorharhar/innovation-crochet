import { createClient } from "./supabase/server";

// PRODUCTS
export async function getProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      description,
      price,
      stock,
      featured,
      categories (
        name,
        slug
      ),
      productImages (
        image_url,
        alt_text,
        sort_order
      ),
      reviews (
        rating
      )
    `,
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Products could not be loaded: ${error.message}`);
  }

  return data;
}

export async function getProduct(slug) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      description,
      price,
      stock,
      featured,
      categories (
        id,
        name
      ),
      productImages (
        id,
        image_url
      ),
      reviews (
        id,
        rating,
        comment
      ),
      productVariants (
        id,
        size,
        color,
        stock
      )
    `,
    )
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getProductsBySlugs(slugs) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      price,
      categories (
        name
      ),
      productImages (
        image_url
      )
    `,
    )
    .in("slug", slugs);

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return slugs
    .map((slug) => data?.find((product) => product.slug === slug))
    .filter(Boolean);
}

// CART

export async function getCart() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (cartError) {
    throw new Error(cartError.message);
  }

  if (!cart) {
    return [];
  }

  const { data: cartItems, error: cartItemsError } = await supabase
    .from("cartItems")
    .select(
      `
      id,
      quantity,
      product_id,
      product_variant_id,
      products (
        id,
        name,
        slug,
        price,
        productImages (
          id,
          image_url,
          alt_text
        )
      ),
      productVariants (
        id,
        size,
        color,
        stock, 
        price
      )
    `,
    )
    .eq("cart_id", cart.id)
    .order("created_at", { ascending: true });

  if (cartItemsError) {
    throw new Error(cartItemsError.message);
  }

  return cartItems ?? [];
}

// CHECKOUT

export async function getCheckoutData() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      cartItems: [],
      subtotal: 0,
      shipping: 0,
      total: 0,
    };
  }

  const { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (cartError) {
    throw new Error(`Cart could not be loaded: ${cartError.message}`);
  }

  if (!cart) {
    return {
      user,
      cartItems: [],
      subtotal: 0,
      shipping: 0,
      total: 0,
    };
  }

  const { data: cartItems, error: itemsError } = await supabase
    .from("cartItems")
    .select(
      `
      id,
      quantity,
      product_id,
      product_variant_id,
      products (
        id,
        name,
        slug,
        price
      ),
      productVariants (
        id,
        price,
        size,
        color,
        stock,
        product_id
      )
    `,
    )
    .eq("cart_id", cart.id)
    .order("created_at", { ascending: true });

  if (itemsError) {
    throw new Error(`Cart items could not be loaded: ${itemsError.message}`);
  }

  if (!cartItems || cartItems.length === 0) {
    return {
      user,
      cartItems: [],
      subtotal: 0,
      shipping: 0,
      total: 0,
    };
  }

  const formattedItems = cartItems.map((item) => {
    const product = item.products;
    const variant = item.productVariants;

    if (!product) {
      throw new Error("One of the products in your cart no longer exists.");
    }

    const price = variant ? Number(variant.price) : Number(product.price);

    if (!Number.isFinite(price) || price < 0) {
      throw new Error(`The price for ${product.name} is invalid.`);
    }

    return {
      ...item,
      products: product,
      productVariants: variant,
      price,
      itemSubtotal: price * item.quantity,
    };
  });

  const subtotal = formattedItems.reduce(
    (sum, item) => sum + item.itemSubtotal,
    0,
  );

  const shipping = subtotal >= 50 ? 0 : 5;

  const total = subtotal + shipping;

  return {
    user,
    cartItems: formattedItems,
    subtotal,
    shipping,
    total,
  };
}

// ORDER
export async function getOrder(orderId) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      order: null,
      orderItems: [],
    };
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(
      `
      id,
      user_id,
      status,
      total,
      shipping_name,
      shipping_phone,
      shipping_address,
      shipping_city,
      shipping_province,
      shipping_postal_code,
      shipping_country,
      delivery_instructions,
      created_at
    `,
    )
    .eq("id", orderId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (orderError) {
    throw new Error(`Order could not be loaded: ${orderError.message}`);
  }

  if (!order) {
    return {
      user,
      order: null,
      orderItems: [],
    };
  }

  const { data: orderItems, error: orderItemsError } = await supabase
    .from("orderItems")
    .select(
      `
      id,
      product_id,
      product_variant_id,
      product_name,
      price,
      quantity,
      subtotal
    `,
    )
    .eq("order_id", order.id)
    .order("id", { ascending: true });

  if (orderItemsError) {
    throw new Error(
      `Order items could not be loaded: ${orderItemsError.message}`,
    );
  }

  return {
    user,
    order,
    orderItems: orderItems || [],
  };
}

export async function getOrders() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      orders: [],
    };
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      created_at,
      status,
      total,
      orderItems (
        id,
        quantity,
        price,
        product_name
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Orders error:", error);

    throw new Error(`Orders could not be loaded: ${error.message}`);
  }

  return {
    user,
    orders: orders || [],
  };
}
