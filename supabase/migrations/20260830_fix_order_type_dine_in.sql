-- Align the database order type enum with the front-end checkout terms that are already in use.
-- The current storefront exposes: Pickup, Dine-in.
-- The earlier database definition only allowed: Pickup, Delivery.
-- This migration preserves the existing UI and fixes the contract mismatch without altering the storefront.

ALTER TYPE public.order_type ADD VALUE IF NOT EXISTS 'Dine-in';
