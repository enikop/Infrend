import { Repository } from 'typeorm';
import { Request, Response } from 'express';

export abstract class Controller {
    repository: Repository<any>;

    //Get all entities from the given repository (of given type)
    getAll = async (req: Request, res: Response) => {
        try {
            const entities = await this.repository.find();
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    //Get all entities from the given repository with filter criteria given as query params
    getAllFiltered = async (req: Request, res: Response) => {
        try {
            const filterParams = req.query;
            const entities = await this.repository.find({
                where: filterParams
            });
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    //Get one entity by id, given as part of the requested route
    getOne = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const entity = await this.repository.findOneBy({
                 id: id
            });
            if (!entity) {
                return this.handleError(res, null, 404, 'Not found.');
            }

            res.json(entity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    //Create the entity specified in request body
    create = async (req: Request, res: Response) => {
        try {
            const entity = this.repository.create(req.body as object);
            delete entity.id;

            const entityInserted = await this.repository.save(entity);

            res.json(entityInserted);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    //Update the entity specified in request body, if it already exists (otherwise response 404)
    update = async (req: Request, res: Response) => {
        try {
            const entity = this.repository.create(req.body as object);
            const entityToUpdate = await this.repository.findOneBy({
                id: entity.id
            });

            if (!entityToUpdate || !entity.id) {
                return this.handleError(res, null, 404, 'No entity found with this id.');
            }

            await this.repository.save(entity);
            res.json(entity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    //Delete the entity with the id specified as part of the request route, if it already exists (otherwise response 404)
    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const entityToDelete = await this.repository.findOneBy({
                id: id
            });

            if (!entityToDelete) {
                return this.handleError(res, null, 404, 'Entity not found.');
            }

            await this.repository.remove(entityToDelete);
            res.send();
        } catch (err) {
            this.handleError(res, err);
        }
    };

    //Universal error handler, sends back status and error message
    handleError(res: Response, err = null, status = 500, message = 'Unexpected server error') {
        if (err) {
            console.error(err);
        }

        //Signal violation of the unique constraint in response
        if (err.code && err.code == 'ER_DUP_ENTRY') {
            //422 Unprocessable Entity
            res.status(422).json({ error: err.code })
        } else {
            res.status(status).json({ error: message });
        }
    }
}
