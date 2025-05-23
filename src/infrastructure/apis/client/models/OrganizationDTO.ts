/* tslint:disable */
/* eslint-disable */
/**
 * MobyLab Web App
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface OrganizationDTO
 */
export interface OrganizationDTO {
    /**
     * 
     * @type {string}
     * @memberof OrganizationDTO
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof OrganizationDTO
     */
    name: string;
}

/**
 * Check if a given object implements the OrganizationDTO interface.
 */
export function instanceOfOrganizationDTO(value: object): value is OrganizationDTO {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    return true;
}

export function OrganizationDTOFromJSON(json: any): OrganizationDTO {
    return OrganizationDTOFromJSONTyped(json, false);
}

export function OrganizationDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrganizationDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
    };
}

export function OrganizationDTOToJSON(json: any): OrganizationDTO {
    return OrganizationDTOToJSONTyped(json, false);
}

export function OrganizationDTOToJSONTyped(value?: OrganizationDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'name': value['name'],
    };
}

