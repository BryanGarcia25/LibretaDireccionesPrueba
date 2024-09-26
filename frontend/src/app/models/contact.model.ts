import { Address } from "./address.model";
import { Email } from "./email.model";
import { Phone } from "./phone.model";

export interface Contact {
    id: string,
    name: string,
    notes: string,
    birthday: Date,
    website: string,
    company: string,
    phones: Phone[],
    emails: Email[],
    addresses: Address[]
}