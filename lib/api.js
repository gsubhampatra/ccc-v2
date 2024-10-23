export const addMember = async (data) => {
  const response = await fetch('/api/members', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to add member')
  return response.json()
}

export const getMembers = async () => {
    const response = await fetch('/api/members')
    if (!response.ok) throw new Error('Failed to fetch members')
    return response.json()
  }

export const addEvent = async (data) => {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to add event')
  return response.json()
}

export const registerForEvent = async (data) => {
  const response = await fetch('/api/registrations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to register for event')
  return response.json()
}

export const getEvents = async () => {
  const response = await fetch('/api/events')
  if (!response.ok) throw new Error('Failed to fetch events')
   const data = await response.json()
   return data.events
}
export const updateEvent = async ({ id, ...data }) => {
    const response = await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to update event')
    return response.json()
  }