export type ModelPoint = { model: string; temperature: number | null }
export type ComparisonCity = { city: string; models: ModelPoint[] }

export const mergeComparisonSeries = (cities: ComparisonCity[], selectedModels: string[]) => cities.map((city) => ({ city: city.city, ...Object.fromEntries(selectedModels.map((model) => [model, city.models.find((point) => point.model === model)?.temperature ?? null])) }))
