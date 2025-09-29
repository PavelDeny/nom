// src/lib/utils/http.ts
import { NextResponse } from "next/server";

/**
 * Standard HTTP response utilities
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: unknown;
}

/**
 * Create success response
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  status: number = 200,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status },
  );
}

/**
 * Create error response
 */
export function createErrorResponse(
  error: string,
  status: number = 400,
  details?: unknown,
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      details,
    },
    { status },
  );
}

/**
 * Create validation error response
 */
export function createValidationErrorResponse(
  errors: string[],
  status: number = 400,
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: "Validation failed",
      details: errors,
    },
    { status },
  );
}

/**
 * Create not found response
 */
export function createNotFoundResponse(
  resource: string = "Resource",
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: `${resource} not found`,
    },
    { status: 404 },
  );
}

/**
 * Create conflict response
 */
export function createConflictResponse(
  message: string = "Resource already exists",
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 409 },
  );
}

/**
 * Create internal server error response
 */
export function createInternalErrorResponse(
  error?: string,
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: error || "Internal server error",
    },
    { status: 500 },
  );
}
