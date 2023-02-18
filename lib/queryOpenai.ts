import openai from './chatgpt'
import { queryOpenaiConfig } from './configs'

const queryOpenai = async (prompt: string, chatId: string, model: string) => {
  console.log('queryOpenai: ', {
    ...queryOpenaiConfig,
    model,
    prompt,
  })

  const res = await openai
    .createCompletion({
      ...queryOpenaiConfig,
      model,
      prompt,
    })
    .then(res => res.data.choices[0].text)
    .catch(
      err =>
        `ChatGPT was unable to find an answer for that! (Error: ${err.message})`
    )

  return res
}

export default queryOpenai
