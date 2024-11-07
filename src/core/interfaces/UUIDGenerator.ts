
/**
 * Interface for UUID Generation.
 * Provides a method to generate universally unique identifiers (UUIDv7).
 */
export interface UUIDGenerator
{
    /**
     * Generates a new UUIDv7.
     * @returns { string }
     */
    generate(): string
}