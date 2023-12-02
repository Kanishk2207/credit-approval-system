const Queue = require('bull');
const { redisConfig } = require('../redis/redisConfig');
const { injestData } = require('../../src/data-injestion/api/injestion-service');

const myQueue = new Queue('myQueueName', {
  redis: {
    port: redisConfig.port,
    host: redisConfig.host,    
  },
  limiter: {
    max: 10, 
    duration: 1000, 
  },
  defaultJobOptions: {
    attempts: 3, 
    backoff: {
      type: 'exponential',
      delay: 1000, 
    },
    removeOnComplete: true, 
    removeOnFail: true, 
  },
});

// Process function that defines the job to be processed
myQueue.process('ingestionJob', async (job) => {
  try {
    const { files } = job.data; 
      
      const results = await injestData(files);
      console.log(results);
      return results;
    } catch (error) {
      console.error('Job failed:', job.id, error);
      throw new Error('Job processing failed');
    }
  });

// Event listeners for job completion, failure, etc.
myQueue.on('completed', (job, result) => {
  // console.log(`Job ${job.id} has been completed with result:`, result);
});

myQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} has failed with error:`, err);
});

module.exports = myQueue;
