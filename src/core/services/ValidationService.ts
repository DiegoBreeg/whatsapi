export class ValidationService
{
    /**
     * This method trims the input, removes any invalid characters (non-letter characters),
     * and ensures the name is in uppercase. If the cleaned name is empty, an error is thrown.
     * 
     * @param { string } name - The name of the entity.
     * @returns { string } - the validated entity name.
     * @throws { Error } If the cleaned name is empty after trimming and removing invalid characters.
     */
    public static validateName(name: string): string
    {
        const cleanedName = name
            .trim()
            .replace(/[^a-zA-Zà-üÀ-Ü\s]/g, '')
            .toUpperCase();

        if (cleanedName.length === 0)
            throw new Error("Name must contain at least one valid character");
        return cleanedName;
    }

    /**
     * Validate the email format.
     * Uses a regex pattern to ensure the email follows common email standards.
     * @param { string } email - The email to validate.
     * @returns { string } - The validated email.
     * @throws { Error } If the email format is invalid.
     */
    public static validateEmail(email: string): string
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email))
            throw new Error("Invalid email format");

        return email;
    }

    /**
     * This method checks that the provided start date is earlier than the subscription end date.
     * If the start date is later than the end date, an error is thrown.
     * @param { Date } subscriptionStartDate  - The start date of the tenant's subscription or service.
     * @param { Date } subscriptionEndDate - The end date of the tenant's subscription or service.
     * @returns { Date } - The validated subscription start date.
     * @throws { Error } If the subscription start date is later than the subscription end date.
     */
    public static validateSubscriptionStartDate(subscriptionStartDate: Date, subscriptionEndDate: Date)
    {
        if (subscriptionStartDate > subscriptionEndDate)
            throw new Error("Subscription start date must be less than subscription end date");
        return subscriptionStartDate;
    }

    /**
     * This method ensures that the subscription end date is greater than the subscription start date.
     * If the provided subscription end date is earlier than the start date, an error is thrown.
     * @param { Date } subscriptionStartDate  - The start date of the tenant's subscription or service.
     * @param { Date } subscriptionEndDate - The end date of the tenant's subscription or service.
     * @returns { Date } - The validated subscriptionEndDate.
     * @throws {Error} If the subscription end date is earlier than the subscription start date.
     */
    public static validateSubscriptionEndDate(subscriptionStartDate: Date, subscriptionEndDate: Date)
    {
        if (subscriptionEndDate < subscriptionStartDate)
            throw new Error("Subscription end date must be greater than subscription start date");
        return subscriptionEndDate;
    }

    /**
     * This method ensures that the user limit is a positive number greater than 0.
     * If the provided user limit is less than or equal to 0, an error is thrown.
     * @param { number } userLimit - The number of users the tenant is allowed to have.
     * @returns { number } - The validated userLimit number.
     * @throws { Error } If the user limit is less than or equal to 0.
     */
    public static validateUserLimit(userLimit: number)
    {
        if (userLimit <= 0)
            throw new Error("User limit must be a positive number greater than 0");
        return userLimit;
    }
}