import './styles/home.screen.css'

const quoteGenBtn = document.querySelector<HTMLDivElement>('#quote-generator')
const adviceId = document.querySelector<HTMLParagraphElement>('p')
const adviceQuote = document.querySelector<HTMLHeadingElement>('h1')

const generateRandomId = (): number => {
  return Math.floor(Math.random() * 224)
}

const populateTextFields = (
  paragraphText: string,
  headingText: string,
  field1: HTMLParagraphElement | null,
  field2: HTMLHeadingElement | null
): void => {
  if (field1 && field2) {
    field1.textContent = paragraphText
    field2.textContent = headingText
  }
}

const generateQuote = async (): Promise<void> => {
  populateTextFields('', 'Loading...', adviceId, adviceQuote)

  try {
    const fetchingAdvice = await fetch(
      `https://api.adviceslip.com/advice/${generateRandomId()}`
    )

    const quoteData = await fetchingAdvice.json()

    if (quoteData) {
      populateTextFields(
        `advice #${quoteData.slip.id}`,
        quoteData.slip.advice,
        adviceId,
        adviceQuote
      )
    }
  } catch (e) {
    populateTextFields('Error', 'Something went wrong.', adviceId, adviceQuote)
  }
}

window.addEventListener('load', generateQuote)
quoteGenBtn?.addEventListener('click', generateQuote)
