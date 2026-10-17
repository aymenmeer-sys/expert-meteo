import { describe, expect, it } from 'vitest'
import { mergeComparisonSeries } from './comparison'

describe('mergeComparisonSeries', () => {
  it('merges selected model values by city and preserves missing values', () => {
    expect(mergeComparisonSeries([
      { city: 'Paris', models: [{ model: 'ecmwf_ifs025', temperature: 18 }, { model: 'gfs_seamless', temperature: 17 }] },
      { city: 'Lyon', models: [{ model: 'ecmwf_ifs025', temperature: 20 }] },
    ], ['ecmwf_ifs025', 'gfs_seamless'])).toEqual([
      { city: 'Paris', ecmwf_ifs025: 18, gfs_seamless: 17 },
      { city: 'Lyon', ecmwf_ifs025: 20, gfs_seamless: null },
    ])
  })
})
