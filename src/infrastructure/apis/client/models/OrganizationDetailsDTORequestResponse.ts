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
import type { OrganizationDetailsDTO } from './OrganizationDetailsDTO';
import {
    OrganizationDetailsDTOFromJSON,
    OrganizationDetailsDTOFromJSONTyped,
    OrganizationDetailsDTOToJSON,
    OrganizationDetailsDTOToJSONTyped,
} from './OrganizationDetailsDTO';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';

/**
 * 
 * @export
 * @interface OrganizationDetailsDTORequestResponse
 */
export interface OrganizationDetailsDTORequestResponse {
    /**
     * 
     * @type {OrganizationDetailsDTO}
     * @memberof OrganizationDetailsDTORequestResponse
     */
    readonly response?: OrganizationDetailsDTO | null;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof OrganizationDetailsDTORequestResponse
     */
    readonly errorMessage?: ErrorMessage | null;
}

/**
 * Check if a given object implements the OrganizationDetailsDTORequestResponse interface.
 */
export function instanceOfOrganizationDetailsDTORequestResponse(value: object): value is OrganizationDetailsDTORequestResponse {
    return true;
}

export function OrganizationDetailsDTORequestResponseFromJSON(json: any): OrganizationDetailsDTORequestResponse {
    return OrganizationDetailsDTORequestResponseFromJSONTyped(json, false);
}

export function OrganizationDetailsDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrganizationDetailsDTORequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : OrganizationDetailsDTOFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function OrganizationDetailsDTORequestResponseToJSON(json: any): OrganizationDetailsDTORequestResponse {
    return OrganizationDetailsDTORequestResponseToJSONTyped(json, false);
}

export function OrganizationDetailsDTORequestResponseToJSONTyped(value?: Omit<OrganizationDetailsDTORequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}

