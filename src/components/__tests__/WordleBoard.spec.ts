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
    test.each(
      [
        "FLY",
        "tests",
        "QWERT"
      ]
    )("If '%s' is provided, a warning is emmited", async (wordOfTheDay) => {
      console.warn = vi.fn()
      mount(WordleBoard, {props: {wordOfTheDay: "FLY"}})
      expect(console.warn).toHaveBeenCalled()
      
    })
  
    test("If the word of the day is not all in uppercase, a warning is emmited", async () => {
      console.warn = vi.fn()
      mount(WordleBoard, {props: {wordOfTheDay: "tests"}})
      expect(console.warn).toHaveBeenCalled()
    })
  
    test("If the word of the day is not a real word, a warning is emmited", async () => {
      console.warn = vi.fn()
      mount(WordleBoard, {props: {wordOfTheDay: "QWERT"}})
      expect(console.warn).toHaveBeenCalled()
    })
  
    test("no wraning is emmitted if the word of the day is a real uppercase English word with 5 chars"), async () => {
      console.warn = vi.fn()
      mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})
      expect(console.warn).not.toHaveBeenCalled()
    }
  })
  
  describe("Player input", () => {
    test.todo('guesses are limited to 5 letters')
    test.todo("guesses can only be submitted if they are real words")
    test.todo("guesses are not case-sensitive")
    test.todo("guesses can only contain letters")
  })
    
})
 