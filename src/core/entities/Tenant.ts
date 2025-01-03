export interface TenantProps
{
    /**
     * The unique identifier for the tenant (company).
     * @type { string }
     */
    id: string;

    /**
     * The unique identifier for the plan or subscription the tenant is using.
     * @type { string }
     */
    planId: string;

    /**
     * The name of the tenant (company).
     * @type { string }
     */
    name: string;

    /**
     * The email address for administrative contact within the tenant.
     * @type { string }
     */
    email: string;

    /**
     * Indicates if the tenant is active.
     * @type { boolean }
     */
    isActive: boolean;

    /**
    * The start date of the tenant's subscription or service.
    * @type { Date }
    */
    subscriptionStartDate: Date;

    /**
     * The end date of the tenant's subscription or service (if applicable).
     * @type { Date }
     */
    subscriptionEndDate: Date;

    /**
     * The number of users the tenant is allowed to have.
     * @type { number }
     */
    userLimit: number;
}

export class Tenant
{
    /**
     * The unique identifier for the tenant (company).
     * @priate
     * @readonly
     * @type { string }
     */
    readonly #id: string;

    /**
     * The unique identifier for the plan or subscription the tenant is using.
     * @priate
     * @type { string }
     */
    #planId: string;

    /**
     * The name of the tenant (company).
     * @private
     * @type { string }
     */
    #name: string;

    /**
     * The email address for administrative contact within the tenant.
     * @private
     * @readonly
     * @type { string };
     */
    readonly #email: string;

    /**
     * Indicates if the tenant is active.
     * @private
     * @type { boolean }
     */
    #isActive: boolean;

    /**
     * The start date of the tenant's subscription or service.
     * @private
     * @type { Date }
     */
    #subscriptionStartDate: Date;

    /**
     * The end date of the tenant's subscription or service (if applicable).
     * @private
     * @type { Date }
     */
    #subscriptionEndDate: Date;

    /**
     * The number of users the tenant is allowed to have.
     * @private
     * @type { number }
     */
    #userLimit: number;

    /**
     * Creates a new Tenant instance with provided properties.
     * @param { UserProps } userProps - The properties to initialize the User.
     */
    constructor(tenantProps: TenantProps)
    {
        this.#id = tenantProps.id;
        this.#name = tenantProps.name;
        this.#email = tenantProps.email;
        this.#isActive = tenantProps.isActive;
        this.#planId = tenantProps.planId;
        this.#subscriptionStartDate = tenantProps.subscriptionStartDate;
        this.#subscriptionEndDate = tenantProps.subscriptionEndDate;
        this.#userLimit = tenantProps.userLimit;
    }

    /**
     * Get tenant id.
     * @returns { string }
     */
    public get id()
    {
        return this.#id;
    }

    /**
     * Get tenant name.
     * @returns { string }
     */
    public get name()
    {
        return this.#name;
    }

    /**
     * Get tenant email.
     * @returns { string }
     */
    public get email()
    {
        return this.#email;
    }

    /**
     * Get tenant isActive.
     * @returns { boolean }
     */
    public get isActive()
    {
        return this.#isActive;
    }

    /**
     * Get tenant planId.
     * @returns { string }
     */
    public get planId()
    {
        return this.#planId;
    }

    /**
     * Get tenant subscriptionStartDate.
     * @returns { date }
     */
    public get subscriptionStartDate()
    {
        return this.#subscriptionStartDate;
    }

    /**
     * Get tenant subscriptionEndDate.
     * @returns { Date }
     */
    public get subscriptionEndDate()
    {
        return this.#subscriptionEndDate;
    }

    /**
     * Get tenant userLimit.
     * @returns { number }
     */
    public get userLimit()
    {
        return this.#userLimit;
    }

    /**
     * Set the tenant's name.
     * @param { string } name - The name of Tenant.
     */
    public set name(name: string)
    {
        this.#name = name;
    }

    /**
     * Set tenant isActive.
     * @param { boolean } isActive - Indicates whether the user account is active.
     */
    public set isActive(isActive: boolean)
    {
        this.#isActive = isActive;
    }

    /**
     * Set tenant planId.
     * @param { string } planId  - The unique identifier for the plan or subscription the tenant is using.
     */
    public set planId(planId: string)
    {
        this.#planId = planId;
    }

    /**
     * Set the tenant's subscription start date.
     * @param { Date } subscriptionStartDate  - The start date of the tenant's subscription or service.  
     */
    public set subscriptionStartDate(subscriptionStartDate: Date)
    {
        this.#subscriptionStartDate = subscriptionStartDate;
    }

    /**
     * Set the tenant's subscription end date.
     * @param { Date } subscriptionEndDate - The end date of the tenant's subscription or service.
     */
    public set subscriptionEndDate(subscriptionEndDate: Date)
    {
        this.#subscriptionEndDate = subscriptionEndDate
    }

    /**
     * Set the tenant's user limit.
     * @param { number } userLimit - The number of users the tenant is allowed to have.
     */
    public set userLimit(userLimit: number)
    {
        this.#userLimit = userLimit;
    }
}