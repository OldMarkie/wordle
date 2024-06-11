import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings'

describe('WordleBoard', () => {
  let wordOfTheDay = "TESTS"
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() :void => {
    wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  })

  async function playerSubmitsGuess(guess:string): Promise<void> {
    const guessInput: DOMWrapper<Element>  = wrapper.find("input[type=text]")
    await guessInput.setValue(guess)
    await guessInput.trigger("keydown.enter")
  }
  
  describe("End of the game messages", () => {
    test("a victory messgae appears when the user makes a guess that matches the word of the day", async(): Promise <void>=> {
    
      await playerSubmitsGuess(wordOfTheDay)  
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  
    })
  
    test("a defeat message appears if the user makes a guess that is incorrect", async (): Promise <void> => {
      
      await playerSubmitsGuess("WRONG")  
      expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
    })
  
  
  
    test("no end-of-game message appears if the user has not yet made a guess", async (): Promise <void> => {
      const wrapper: VueWrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
      
    })
  })
  
  describe("Rules for defining thw word of the day", () => {
    beforeEach((): void => {
      console.warn = vi.fn()
    })

    test.each(
      [
        {wordOfTheDay: "FLY", reason: "it must have 5 chars"},
        {wordOfTheDay: "tests", reason: "it must be in uppercase"},
        {wordOfTheDay: "QWERT", reason: "it must be valid English word"}
      ]
    )("Since $reason: $wordOfTheDay is invalid, therefore a warning is emitted", async ({wordOfTheDay}) => {
    
      mount(WordleBoard, {props: {wordOfTheDay: wordOfTheDay}})
      expect(console.warn).toHaveBeenCalled()
      
    })
  
    test("no wraning is emmitted if the word of the day is a real uppercase English word with 5 chars"), async () => {
      mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})
      expect(console.warn).not.toHaveBeenCalled()
    }
  })
  
  describe("Player input", () => {
    test('guesses are limited to ${WORD_SIZE} letters', async() => {
      await playerSubmitsGuess(wordOfTheDay)
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
    test.todo("guesses can only be submitted if they are real words")
    test.todo("guesses are not case-sensitive")
    test.todo("guesses can only contain letters")
  })
    
})
 