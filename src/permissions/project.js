import { ROLE } from "../data.js"

export function scopedProjects(user, projects) {
if (user.role === ROLE.ADMIN) return projects
return projects.filter(project => project.userId === user.id)
}
  
export function canDeleteProject(user, project) {
return project.userId === user.id
}

export function canViewProject(user, project) {
    return (
        user.role === ROLE.ADMIN ||
        project.userId == user.id
    )
}

