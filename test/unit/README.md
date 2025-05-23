# Todo Component Unit Testing Notes

## Mocking Requirements
The Todo component is relatively self-contained and didn't require extensive mocking. The only external dependencies were:

- Vue Test Utils' `mount` function for component rendering
- Basic DOM events (`keydown.enter`, `click`)
- Component's internal state management

## Failing Test Example
One interesting failing test case occurred in the filtered todos test:

```javascript
// Initial failing test
it('filters todos correctly', async () => {
  const wrapper = mount(Todo)
  await wrapper.setData({
    todos: [
      { id: 1, text: 'Short' },
      { id: 2, text: 'Long todo text' }
    ],
    filter: 'short'
  })
  
  // This assertion failed because it assumed 'Long todo text' 
  // would be included in short todos
  expect(wrapper.vm.filteredTodos).toHaveLength(2)
})
```

### The Fix
The test failed because it didn't account for the specific length requirements in the component's filter logic:
- Short todos: ≤ 10 characters
- Long todos: > 10 characters

The fixed version properly tests each filter category:

```javascript
it('filters todos correctly based on length', async () => {
  const wrapper = mount(Todo)
  await wrapper.setData({
    todos: [
      { id: 1, text: 'Short' },      // 5 chars (short)
      { id: 2, text: 'Very long todo item' }  // 17 chars (long)
    ]
  })

  await wrapper.setData({ filter: 'short' })
  expect(wrapper.vm.filteredTodos).toHaveLength(1)
  expect(wrapper.vm.filteredTodos[0].text).toBe('Short')
})
```

This experience highlighted the importance of:
1. Understanding the exact business logic requirements
2. Using appropriate test data that covers edge cases
3. Making explicit assertions about the expected behavior