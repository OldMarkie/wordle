import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE } from '@/settings'

describe('WordleBoard', () => {
  test("a victory messgae appears when the user makes a guess that matches the word of the day", async(): Promise <void >=> {
    const wrapper: VueWrapper = mount(WordleBoard, {props: {wordOfTheDay:"TESTS"}})

    const guessInput: DOMWrapper<Element>  = wrapper.find("input[type=text]")
    await guessInput.setValue("TESTS")
    await guessInput.trigger("keydown.enter")

    expect(wrapper.text()).toContain(VICTORY_MESSAGE)

  })
})
 