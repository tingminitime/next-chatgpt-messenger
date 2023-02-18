import type { CreateCompletionRequest } from 'openai'

export const queryOpenaiConfig: CreateCompletionRequest = {
  model: 'text-davinci-003',
  prompt: '',
  temperature: 0.9,
  top_p: 1,
  max_tokens: 1000,
  presence_penalty: 0,
  frequency_penalty: 0,
}
