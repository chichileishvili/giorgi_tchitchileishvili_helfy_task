const VALID_PRIORITIES = ['low', 'medium', 'high'];

function validateCreateTask(req, res, next) {
  const { title, description, priority } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }

  if (title.trim().length > 200) {
    return res.status(400).json({ error: 'Title must not exceed 200 characters' });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ error: 'Description must be a string' });
  }

  if (description && description.length > 1000) {
    return res.status(400).json({ error: 'Description must not exceed 1000 characters' });
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({
      error: `Priority must be one of: ${VALID_PRIORITIES.join(', ')}`
    });
  }

  next();
}

function validateUpdateTask(req, res, next) {
  const { title, description, priority, completed } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body must contain at least one field to update' });
  }

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    if (title.trim().length > 200) {
      return res.status(400).json({ error: 'Title must not exceed 200 characters' });
    }
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ error: 'Description must be a string' });
  }

  if (description && description.length > 1000) {
    return res.status(400).json({ error: 'Description must not exceed 1000 characters' });
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({
      error: `Priority must be one of: ${VALID_PRIORITIES.join(', ')}`
    });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be a boolean' });
  }

  next();
}

module.exports = { validateCreateTask, validateUpdateTask };
