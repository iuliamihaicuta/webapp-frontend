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
 * @interface ProjectDTO
 */
export interface ProjectDTO {
    /**
     * 
     * @type {string}
     * @memberof ProjectDTO
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectDTO
     */
    title: string;
    /**
     * 
     * @type {Date}
     * @memberof ProjectDTO
     */
    startDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof ProjectDTO
     */
    endDate: Date;
    /**
     * 
     * @type {string}
     * @memberof ProjectDTO
     */
    location: string;
}

/**
 * Check if a given object implements the ProjectDTO interface.
 */
export function instanceOfProjectDTO(value: object): value is ProjectDTO {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('startDate' in value) || value['startDate'] === undefined) return false;
    if (!('endDate' in value) || value['endDate'] === undefined) return false;
    if (!('location' in value) || value['location'] === undefined) return false;
    return true;
}

export function ProjectDTOFromJSON(json: any): ProjectDTO {
    return ProjectDTOFromJSONTyped(json, false);
}

export function ProjectDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProjectDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'startDate': (new Date(json['startDate'])),
        'endDate': (new Date(json['endDate'])),
        'location': json['location'],
    };
}

export function ProjectDTOToJSON(json: any): ProjectDTO {
    return ProjectDTOToJSONTyped(json, false);
}

export function ProjectDTOToJSONTyped(value?: ProjectDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'title': value['title'],
        'startDate': ((value['startDate']).toISOString()),
        'endDate': ((value['endDate']).toISOString()),
        'location': value['location'],
    };
}

