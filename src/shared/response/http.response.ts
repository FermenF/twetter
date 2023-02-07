import { Response } from "express";

export function HttResponse(res: Response, code: number, data?: any[], message?: string, error?: any): Response {
    return res.status(code).json({
        data: data,
        message: message,
        error: error
    });
};

export function HttResponseError(res: Response, error?: any): Response {
    return res.status(500).json({
        message: 'Internal Server Error.',
        error: error
    });
};

export function HttResponseActionError(res: Response, error?: any): Response {
    return res.status(400).json({
        message: 'Something has gone wrong.',
        error: error
    });
};

export function PaginateResponse(res: Response, code: number, data: any[], total_items:number, page:number, perPage:number, message?: string): Response {
    return res.status(code).send({
        data: data,
        message: message,
        total_items: total_items,
        page: page,
        perPage: perPage,
        last_page: Math.ceil(total_items / perPage)
    });
}
