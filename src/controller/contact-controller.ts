import { Response, NextFunction, request } from "express";
import { UserRequest } from "../type/user-request";
import { CreateContactRequest, UpdateContactRequest } from "../model/contact-model";
import { ContactService } from "../service/contact-service";

export class ContactController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateContactRequest = req.body as CreateContactRequest
            const response = await ContactService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await ContactService.get(req.user!, req.params.id)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateContactRequest = req.body as UpdateContactRequest
            request.id = req.params.id
            const response = await ContactService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async delete(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await ContactService.delete(req.user!, req.params.id)
            res.status(200).json({
                message: 'success'
            })
        } catch(e){
            next(e)
        }
    }
}