"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

// SIGN UP
export async function signupAction(formData) {
  const supabase = await createClient();

  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("fullName")?.toString().trim();

  if (!email || !password || !fullName) {
    return {
      error: "Please fill in all fields.",
    };
  }

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters.",
    };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw new Error("Try again could not sign up");

  redirect("/account");
}

//  LOGIN
export async function loginAction(formData) {
  const supabase = await createClient();

  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!email || !password) {
    return {
      error: "Please enter your email and password.",
    };
  }

  if (error) throw new Error("Invalid email or password.");

  revalidatePath("/");
  revalidatePath("/account");
  revalidatePath("/cart");

  redirect("/account");
}

//  LOGOUT
export async function logoutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error("Invalid email or password.");

  revalidatePath("/");
  revalidatePath("/account");
  revalidatePath("/cart");

  redirect("/");
}

//  ADD TO CART
export async function addToCart(
  productId,
  productVariantId = null,
  quantity = 1,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  let { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!cart) {
    const { data: newCart, error } = await supabase
      .from("carts")
      .insert({
        user_id: user.id,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);

    cart = newCart;
  }

  if (cartError) throw new Error(cartError.message);

  let existingItemQuery = supabase
    .from("cartItems")
    .select("id, quantity")
    .eq("cart_id", cart.id)
    .eq("product_id", productId);

  if (productVariantId) {
    existingItemQuery = existingItemQuery.eq(
      "product_variant_id",
      productVariantId,
    );
  } else {
    existingItemQuery = existingItemQuery.is("product_variant_id", null);
  }

  const { data: existingItem, error: existingItemError } =
    await existingItemQuery.maybeSingle();

  if (existingItemError) {
    throw new Error(existingItemError.message);
  }

  if (existingItem) {
    const { error } = await supabase
      .from("cartItems")
      .update({
        quantity: existingItem.quantity + quantity,
      })
      .eq("id", existingItem.id);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    const { error } = await supabase.from("cartItems").insert({
      cart_id: cart.id,
      product_id: productId,
      product_variant_id: productVariantId,
      quantity,
    });

    if (error) throw new Error(error.message);
  }

  redirect("/cart");
}

// UPDATE CART ITEM QUANTITY
export async function updateCartItemQuantity(cartItemId, quantity) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const newQuantity = Number(quantity);
  if (!Number.isInteger(newQuantity) || newQuantity < 1)
    throw new Error("Invalid quantity.");

  const { data: cartItem, error: cartItemError } = await supabase
    .from("cartItems")
    .select(
      `
          id,
          cart_id,
          product_id,
          product_variant_id,
          carts!inner (
            user_id
          ),
          productVariants (
            stock
          )
        `,
    )
    .eq("id", cartItemId)
    .eq("carts.user_id", user.id)
    .single();

  if (cartItemError || !cartItem)
    throw new Error("Cart item could not be found.");

  const variantStock = cartItem.productVariants?.stock;

  if (
    variantStock !== null &&
    variantStock !== undefined &&
    newQuantity > Number(variantStock)
  )
    throw new Error(`Only ${variantStock} of this item are available.`);

  const { error } = await supabase
    .from("cartItems")
    .update({
      quantity: newQuantity,
    })
    .eq("id", cartItemId);

  if (error) throw new Error(error.message);

  revalidatePath("/cart");
}

// REMOVE CART ITEM
export async function removeCartItem(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const itemId = formData.get("itemId");

  const { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  const { error } = await supabase
    .from("cartItems")
    .delete()
    .eq("cart_id", cart.id)
    .eq("id", itemId);

  if (cartError) throw new Error(cartError.message);
  if (error) throw new Error(error.message);

  revalidatePath("/cart");
}

// CLEAR CART
export async function clearCart() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  const { error } = await supabase
    .from("cartItems")
    .delete()
    .eq("cart_id", cart.id);

  if (cartError) throw new Error(cartError.message);
  if (error) throw new Error(error.message);

  revalidatePath("/cart");
}

// ADD REVIEW
export async function addReview(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to leave a review.");
  }

  const productId = formData.get("productId");
  const productSlug = formData.get("productSlug");
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment");

  if (!productId) {
    throw new Error(error.message);
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5.");
  }

  if (!comment?.trim()) {
    throw new Error("Review comment is required.");
  }

  if (comment.trim().length > 500) {
    throw new Error("Review must be 500 characters or less.");
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      product_id: productId,
      user_id: user.id,
      rating,
      comment: comment.trim(),
    })
    .select(
      `
        id,
        rating,
        comment,
        created_at,
        user:profiles (
          full_name
        )
      `,
    )
    .single();

  if (error) throw new Error(error.message);

  revalidatePath(`/shop/product/${productSlug}`);

  return data;
}

// EDIT REVEWIS
export async function editReviews() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in.",
      reviews: [],
    };
  }

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
        id,
        rating,
        comment,
        created_at,
        product_id,
        products (
          name,
          slug,
          productImages (
            image_url
          )
        )
      `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return {
      success: false,
      error: "Unable to load your reviews.",
      reviews: [],
    };
  }

  return {
    success: true,
    reviews: data || [],
  };
}

export async function updateReviewAction(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to update a review.",
    };
  }

  const reviewId = formData.get("reviewId");
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment")?.trim();

  if (!reviewId) {
    return {
      success: false,
      error: "Review ID is missing.",
    };
  }

  if (!rating || rating < 1 || rating > 5) {
    return {
      success: false,
      error: "Please select a rating between 1 and 5.",
    };
  }

  if (!comment) {
    return {
      success: false,
      error: "Please enter a review.",
    };
  }

  const { error } = await supabase
    .from("reviews")
    .update({
      rating,
      comment,
    })
    .eq("id", reviewId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Update review error:", error);

    return {
      success: false,
      error: "Unable to update your review.",
    };
  }

  revalidatePath("/reviews");

  return {
    success: true,
    message: "Review updated successfully!",
  };
}

export async function deleteReviewAction(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to delete a review.",
    };
  }

  const reviewId = formData.get("reviewId");

  if (!reviewId) {
    return {
      success: false,
      error: "Review ID is missing.",
    };
  }

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Delete review error:", error);

    return {
      success: false,
      error: "Unable to delete your review.",
    };
  }

  revalidatePath("/reviews");

  return {
    success: true,
    message: "Review deleted successfully!",
  };
}

// GET ORDER
export async function createOrder({
  fullName,
  phone,
  address,
  city,
  province,
  postalCode,
  country,
  deliveryInstructions,
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to place an order.",
    };
  }

  const { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (cartError) {
    console.error("Cart error:", cartError);

    return {
      success: false,
      error: cartError.message,
    };
  }

  if (!cart) {
    return {
      success: false,
      error: "Your cart could not be found.",
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
        price
      ),
      productVariants (
        id,
        price,
        product_id
      )
    `,
    )
    .eq("cart_id", cart.id);

  if (itemsError) {
    return {
      success: false,
      error: itemsError.message,
    };
  }

  if (!cartItems || cartItems.length === 0) {
    return {
      success: false,
      error: "Your cart is empty.",
    };
  }

  let subtotal = 0;

  for (const item of cartItems) {
    const product = item.products;
    const variant = item.productVariants;

    if (!product) {
      return {
        success: false,
        error: "One of the products in your cart no longer exists.",
      };
    }

    const price = variant ? Number(variant.price) : Number(product.price);

    if (!Number.isFinite(price) || price < 0) {
      return {
        success: false,
        error: `The price for ${product.name} is invalid.`,
      };
    }

    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return {
        success: false,
        error: `The quantity for ${product.name} is invalid.`,
      };
    }

    subtotal += price * quantity;
  }

  const shipping = subtotal >= 50 ? 0 : 5;

  const total = subtotal + shipping;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      status: "pending",
      total,
      shipping_name: fullName,
      shipping_phone: phone,
      shipping_address: address,
      shipping_city: city,
      shipping_province: province,
      shipping_postal_code: postalCode,
      shipping_country: country,
      delivery_instructions: deliveryInstructions || null,
    })
    .select("id")
    .single();

  if (orderError) {
    console.error("Order creation error:", orderError);

    return {
      success: false,
      error: "We couldn't create your order.",
    };
  }

  const orderItems = cartItems.map((item) => {
    const product = item.products;
    const variant = item.productVariants;

    const price = variant ? Number(variant.price) : Number(product.price);

    return {
      order_id: order.id,
      product_id: product.id,
      product_variant_id: variant?.id || null,
      product_name: product.name,
      price,
      quantity: item.quantity,
    };
  });

  const { error: orderItemsError } = await supabase
    .from("orderItems")
    .insert(orderItems);

  if (orderItemsError) {
    console.error("Order items creation error:", orderItemsError);

    await supabase.from("orders").delete().eq("id", order.id);

    return {
      success: false,
      error: "We couldn't create the items for your order.",
    };
  }

  const { error: clearCartError } = await supabase
    .from("cartItems")
    .delete()
    .eq("cart_id", cart.id);

  if (clearCartError) {
    console.error("Cart clearing error:", clearCartError);

    return {
      success: false,
      error: "Your order was created, but we couldn't clear your cart.",
    };
  }

  revalidatePath("/cart");

  return {
    success: true,
    orderId: order.id,
  };
}
