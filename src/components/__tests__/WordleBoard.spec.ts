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

  test("If a word of the day does not have excatly 5 chars, a warning is emmited", async () => {
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

})
 