const isTransformer = (value) => value != null && typeof value['@@transducer/step'] === 'function'

export default isTransformer
