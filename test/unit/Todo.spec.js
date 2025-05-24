import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Todo from '../../src/components/Todo.vue'

describe('Todo.vue', () => {
   // Test 1: Computed property test for filtered todos
  it('filters todos correctly based on length', async () => {
    const wrapper = mount(Todo)
    
    // Add test todos
    await wrapper.setData({
      todos: [
        { id: 1, text: 'Short' },
        { id: 2, text: 'Very long todo item' },
        { id: 3, text: 'Medium todo' }
      ]
    })

    // Test 'short' filter
    await wrapper.setData({ filter: 'short' })
    expect(wrapper.vm.filteredTodos).toHaveLength(1)
    expect(wrapper.vm.filteredTodos[0].text).toBe('Short')

    // Test 'long' filter
    await wrapper.setData({ filter: 'long' })
    expect(wrapper.vm.filteredTodos).toHaveLength(1)
    expect(wrapper.vm.filteredTodos[0].text).toBe('Very long todo item')

     // Test 'all' filter
    await wrapper.setData({ filter: 'all' })
    expect(wrapper.vm.filteredTodos).toHaveLength(3)
  })

     // Test 2: User interaction test for adding and deleting todos
  it('adds and deletes todos correctly', async () => {
    const wrapper = mount(Todo)
    
    .// Add a new todo
    await wrapper.setData({ newTodo: 'Test todo' })
    await wrapper.find('input').trigger('keydown.enter')
    
    expect(wrapper.vm.todos).toHaveLength(1)
    expect(wrapper.vm.todos[0].text).toBe('Test todo')
    expect(wrapper.vm.newTodo).toBe('')

      // Delete the todo
    const todoId = wrapper.vm.todos[0].id
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.vm.todos).toHaveLength(0)
  })

  .  // Test 3: Edge case test for empty input validation
  it('handles empty todo input correctly', async () => {
    const wrapper = mount(Todo)
    
    // Try to add an empty todo
    await wrapper.setData({ newTodo: '' })
    await wrapper.find('input').trigger('keydown.enter')
    
    expect(wrapper.vm.error).toBe('Todo cannot be empty')
    expect(wrapper.vm.todos).toHaveLength(0)

     // Add valid todo after error
    await wrapper.setData({ newTodo: 'Valid todo' })
    await wrapper.find('input').trigger('keydown.enter')
    
    expect(wrapper.vm.error).toBe('')
    expect(wrapper.vm.todos).toHaveLength(1)
  })
})