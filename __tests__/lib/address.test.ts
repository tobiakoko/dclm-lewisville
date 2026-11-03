import { cityAndState } from '@/lib/address'

describe('cityAndState', () => {
  it('spells out the state for the header brand', () => {
    expect(cityAndState({ city: 'Lewisville', state: 'TX' })).toBe('Lewisville, Texas')
  })

  it('shows an unknown abbreviation as written', () => {
    expect(cityAndState({ city: 'Lagos', state: 'LA-NG' })).toBe('Lagos, LA-NG')
  })
})
