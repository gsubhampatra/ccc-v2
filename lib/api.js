export const addMember = async (data) => {
  const response = await fetch("/api/members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to add member");
  return response.json();
};

export const getMembers = async () => {
  const response = await fetch("/api/members");
  if (!response.ok) throw new Error("Failed to fetch members");
  const data = await response.json();
  return data.members;
};

export const getMember = async (id) => {
  const response = await fetch(`/api/members/${id}`);
  if (!response.ok) throw new Error("Failed to fetch member");
  return response.json();
};

export const updateMember = async (id, data) => {
  const response = await fetch(`/api/members/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update member");
  return response.json();
};

export const deleteMember = async (id) => {
  const response = await fetch(`/api/members/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete member");
  return response.json();
};

export const addEvent = async (data) => {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to add event");
  return response.json();
};

export const registerForEvent = async (data) => {
  const response = await fetch("/api/registrations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to register for event");
  return response.json();
};

export const getEvents = async () => {
  const response = await fetch("/api/events");
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
};

export const getEvent = async (id) => {
  const response = await fetch(`/api/events/${id}`);
  if (!response.ok) throw new Error("Failed to fetch event");
  return response.json();
};

export const updateEvent = async (id, data) => {
  const response = await fetch(`/api/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update event");
  return response.json();
};

export const deleteEvent = async (id) => {
  const response = await fetch(`/api/events/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete event");
  return response.json();
};

export const getRegistrations = async () => {
  const response = await fetch("/api/registrations");
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch registrations");
  }
  return response.json();
};

export const getRegistration = async (id) => {
  const response = await fetch(`/api/registrations/${id}`);
  if (!response.ok) throw new Error("Failed to fetch registration");
  return response.json();
};

export const updateRegistration = async (id, data) => {
  const response = await fetch(`/api/registrations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update registration");
  return response.json();
};

export const deleteRegistration = async (id) => {
  const response = await fetch(`/api/registrations/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete registration");
  return response.json();
};

export const deleteAllRegistrationsForEvent = async (eventId) => {
  const response = await fetch(`/api/registrations?eventId=${eventId}`, {
    method: "DELETE",
  });
  if (!response.ok)
    throw new Error("Failed to delete all registrations for event");
  return response.json();
};

export const getAchievements = async () => {
  const response = await fetch("/api/achievements");
  if (!response.ok) throw new Error("Failed to fetch achievements");
  const data = await response.json();
  return data.achievements;
};

export const getAchievement = async (id) => {
  const response = await fetch(`/api/achievements/${id}`);
  if (!response.ok) throw new Error("Failed to fetch achievement");
  return response.json();
};

export const addAchievement = async (data) => {
  const response = await fetch("/api/achievements", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to add achievement");
  const res = await response.json();
  return res.achievements;
};

export const updateAchievement = async (id, data) => {
  const response = await fetch(`/api/achievements/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update achievement");
  return response.json();
};

export const deleteAchievement = async (id) => {
  const response = await fetch(`/api/achievements/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete achievement");
  return response.json();
};

export const getGalleryImages = async () => {
  const response = await fetch("/api/gallery-images");
  if (!response.ok) throw new Error("Failed to fetch gallery images");
  return response.json();
};

export const getGalleryImage = async (id) => {
  const response = await fetch(`/api/gallery-images/${id}`);
  if (!response.ok) throw new Error("Failed to fetch gallery image");
  return response.json();
};

export const addGalleryImage = async (data) => {
  const response = await fetch("/api/gallery-images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to add gallery image");
  return response.json();
};

export const updateGalleryImage = async (id, data) => {
  const response = await fetch(`/api/gallery-images/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update gallery image");
  return response.json();
};

export const deleteGalleryImage = async (id) => {
  const response = await fetch(`/api/gallery-images/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete gallery image");
  return response.json();
};

export const getWinners = async () => {
  const response = await fetch("/api/winners");
  if (!response.ok) throw new Error("Failed to fetch winners");
  return response.json();
};

export const getWinner = async (id) => {
  const response = await fetch(`/api/winners/${id}`);
  if (!response.ok) throw new Error("Failed to fetch winner");
  return response.json();
};

export const addWinner = async (data) => {
  const response = await fetch("/api/winners", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to add winner");
  return response.json();
};

export const updateWinner = async (id, data) => {
  const response = await fetch(`/api/winners/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update winner");
  return response.json();
};

export const deleteWinner = async (id) => {
  const response = await fetch(`/api/winners/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete winner");
  return response.json();
};

export const getHiringStatus = async () => {
  const response = await fetch("/api/hiring-status");
  if (!response.ok) throw new Error("Failed to fetch hiring status");
  const data = await response.json();

  return data;
};

export const updateHiringStatus = async (data) => {
  const response = await fetch("/api/hiring-status", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update hiring status");
  return response.json();
};

export const getVideos = async () => {
  try {
    const videos = await fetch("/api/videos");
    return videos.json();
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

export const addVideo = async (data) => {
  const response = await fetch("/api/videos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add video");
  }
  return response.json();
};

export const deleteVideo = async (id) => {
  const response = await fetch(`/api/videos/`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete video");
  }
  return response.json();
};

// Fetch all projects
export const getProjects = async () => {
  const response = await fetch("/api/projects");
  if (!response.ok) throw new Error("Failed to fetch projects");
  const data = await response.json();
  return data;
};

// Fetch a single project by ID
export const getProject = async (id) => {
  const response = await fetch(`/api/projects/${id}`);
  if (!response.ok) throw new Error("Failed to fetch project");
  return response.json();
};

// Add a new project
export const addProject = async (data) => {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add project");
  }
  return response.json();
};

// Update an existing project
export const updateProject = async (id, data) => {
  const response = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update project");
  }
  return response.json();
};

// Delete a project
export const deleteProject = async (id) => {
  const response = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete project");
  }
  return response.json();
};
