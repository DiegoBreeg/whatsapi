export interface PersonProps
{
    /**
     * The unique identifier for the person entitie.
     * @type { string }
     */
    id: string;

    /**
     * The unique identifier for the tenant (or company) to which the person belongs.
     * Used for multi-tenant systems to segregate data by company.
     * @type { string }
     */
    tenantId: string;

    /**
     * The name of the person.
     * @type { string }
     */
    name: string;

    /**
     * The email address of the user entitie.
     * @type { string }
     */
    email: string;

    /**
     * The cell phone of person
     * @type { string }
     */
    cellphone: string;
}

/**
 * Represents a Person entity with account-related information.
 */
export class Person
{

    /**
     * The unique identifier for the person entitie.
     * @private 
     * @readonly
     * @type { string }
     */
    readonly #id: string;

    /**
     * The unique identifier for the tenant (or company) to which the person belongs.
     * Used for multi-tenant systems to segregate data by company.
     * @private 
     * @readonly
     * @type { string }
     */
    readonly #tenantId: string;

    /**
     * The name of the person.
     * @private
     * @type { string }
     */
    #name: string;

    /**
     * The email addres of the persons entitie.
     * @private
     * @readonly
     * @type { string }
     */
    readonly #email: string;

    /**
     * The cell phone of person
     * @private
     * @type { string }
     */
    #cellphone: string;

    /**
     * Creates a new person instance with provided properties.
     * @param { PersonProps } personProps - The properties to initialize the User.
     */
    constructor(personProps: PersonProps)
    {
        this.#id = personProps.id;
        this.#tenantId = personProps.tenantId;
        this.#name = personProps.name;
        this.#email = personProps.email
        this.#cellphone = personProps.cellphone
    }

    /**
     * Get person id
     * @returns { string }
     */
    public get id()
    {
        return this.#id;
    }

    /** 
     * Get the unique identifier for the tenant (or company) to which the user belongs.
     * @returns { string }
    */
    public get tenantId()
    {
        return this.#tenantId;
    }

    /**
     * Get person name
     * @returns { string }
     */
    public get name()
    {
        return this.#name;
    }

    /**
     * Get person email
     * @returns { string }
     */
    public get email()
    {
        return this.#email;
    }

    /**
     * Get person cellphone
     * @returns { string }
     */
    public get cellphone()
    {
        return this.#cellphone;
    }

    /**
     * Set person name
     * @param { string } name - Person name
     */
    public set name(name: string)
    {
        this.#name = name;
    }

    /**
     * Set person cellphone
     * @param { string } cellphone - Person cellphone.
     */
    public set cellphone(cellphone: string)
    {
        this.#cellphone = cellphone;
    }
}