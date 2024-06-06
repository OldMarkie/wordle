import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'

describe('WordleBoard', () => {
  test("a victory messgae appears when the user makes a guess that matches the word of the day", async(): Promise <void >=> {
    //arrange

    const wrapper: VueWrapper = mount(WordleBoard, {props: {wordOfTheDay:"TESTS"}})

    //act

    const guessInput: DOMWrapper<Element>  = wrapper.find("input[type=text]")
    await guessInput.setValue("TESTS")
    await guessInput.trigger("keydown.enter")

    //assert

    expect(wrapper.text()).toContain("You won!")

  })
})
 