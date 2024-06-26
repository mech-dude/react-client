import { Router } from 'express';
import { projects } from '../../data.js';
import { authUser } from '../basicAuth.js';
import { canViewProject, canDeleteProject, scopedProjects } from '../../permissions/project.js';
const projectRouter = Router();

projectRouter.get('/', authUser, (req, res) => {
res.json(scopedProjects(req.user, projects))
})

projectRouter.get('/:projectId', setProject, authUser, authGetProject, (req, res) => {
res.json(req.project)
})

projectRouter.delete('/:projectId', setProject, authUser, authDeleteProject, (req, res) => {
res.send('Deleted Project')
})

function setProject(req, res, next) {
const projectId = parseInt(req.params.projectId)
req.project = projects.find(project => project.id === projectId)

if (req.project == null) {
    res.status(404)
    return res.send('Project not found')
}
next()
}

function authGetProject(req, res, next) {
if (!canViewProject(req.user, req.project)) {
    res.status(401)
    return res.send('Not Allowed')
}

next()
}

function authDeleteProject(req, res, next) {
if (!canDeleteProject(req.user, req.project)) {
    res.status(401)
    return res.send('Not Allowed')
}

next()
}

export { projectRouter }