import { sendEmail } from './emailService';

class SimpleQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  push(task) {
    this.queue.push(task);
    if (!this.processing) {
      this.processQueue();
    }
  }

  async processQueue() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const task = this.queue.shift();

    try {
      await sendEmail(task.to, task.subject, task.registrationDetails, task.eventDetails);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }

    // Process next task
    this.processQueue();
  }
}

const emailQueue = new SimpleQueue();

export function addToEmailQueue(emailData) {
  emailQueue.push(emailData);
}

export default emailQueue;
