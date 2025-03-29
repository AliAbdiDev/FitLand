import { cookies } from 'next/headers';

// Interface for cookie options
interface CookieOptions {
    key?: string; // Cookie key
    value?: any; // Cookie value (optional, any type)
    maxAge?: number; // Expiration time in seconds (optional)
}

// Default expiration time: 1 week (7 days) in seconds
const DEFAULT_MAX_AGE = 7 * 24 * 60 * 60; // 604,800 seconds

// Cookie handler function
/**
 * Handles getting, setting, and deleting cookies in Next.js 15.
 *
 * ### Usage Example:
 * 
 * ```typescript
 * // Initialize the cookie handler with a key and value
 * const handler = await cookieHandler({ key: 'user-token', value: 'some-token' });
 * 
 * // Retrieve the currently stored value of the cookie
 * console.log(handler.getValue()); // Outputs the current cookie value
 * 
 * // Access the value that was set during the initialization of this instance
 * console.log(handler.currentValue); // Outputs 'some-token'
 * 
 * // Update the cookie with a new value
 * handler.setValue('new-token'); // Sets the cookie value to 'new-token'
 * 
 * // Remove the cookie from storage
 * handler.deleteCookie(); // Deletes the 'user-token' cookie
 * ```
 */
export const cookieHandler = async ({ key='login-token', value, maxAge=DEFAULT_MAX_AGE }: CookieOptions) => {
    const cookie = await cookies();

    // Get the current value of the cookie
    const getValue = () => cookie.get(key)?.value;

    // Set the cookie with the provided value
    const setValue = (val: any = value) => {
        let jsonValue = '';
        if (val !== undefined) {
            jsonValue = typeof val === 'string' ? val : JSON.stringify(val);
            cookie.set(key, jsonValue, {
                httpOnly: true, // Prevents client-side access to the cookie
                secure: process.env.NODE_ENV === 'production', // Secure only in production
                path: '/', // Cookie available site-wide
                maxAge: maxAge, // Use provided maxAge or default to 1 week
            });
        }
        return jsonValue || undefined;
    };

    // Delete the cookie
    const deleteCookie = () => cookie.delete(key);

    // Initial set if value is provided
    const initialValue = setValue(value);

    return {
        getValue, // Function to get the current cookie value
        setValue, // Function to set a new value
        deleteCookie, // Function to delete the cookie
        currentValue: initialValue, // Value set during this call (if any)
    };
};

