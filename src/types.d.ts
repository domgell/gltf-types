/**
 * Based on GLTF specification:
 * https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#properties-reference
 */

export type TODO = any

type Tuple<T, N extends number> = T[] & { length: N };
type Vector2 = Tuple<number, 2>
type Vector3 = Tuple<number, 3>
type Vector4 = Tuple<number, 4>
type Matrix3x3 = Tuple<number, 9>
type Matrix4x4 = Tuple<number, 16>

// ----------------------------- Accessor ------------------------------

export enum AccessorComponentType {
    BYTE = 5120,
    UNSIGNED_BYTE = 5121,
    SHORT = 5122,
    UNSIGNED_SHORT = 5123,
    UNSIGNED_INT = 5125,
    FLOAT = 5126,
}

export type AccessorType =
    | "SCALAR"
    | "VEC2"
    | "VEC3"
    | "VEC4"
    | "MAT2"
    | "MAT3"
    | "MAT4"

export type Accessor = {
    /**
     * The index of the bufferView.
     */
    bufferView?: number,
    /**
     * The offset relative to the start of the buffer view in bytes.
     */
    byteOffset?: number
    /**
     * The datatype of the accessor's components.
     */
    componentType: AccessorComponentType,
    /**
     * Specifies whether integer data values are normalizd before usage.
     */
    normalized?: boolean,
    /**
     * The number of elements referenced by this accessor.
     */
    count: number,
    /**
     * Specifies if the accessor's elements are scalars, vectors, or matrices.
     */
    type: AccessorType,
    /**
     * Maximum value of each component in this accessor. For example, maximum x, y, z components of a Vector3.
     */
    max?: [number] | Vector2 | Vector3 | Vector4 | Matrix3x3 | Matrix4x4,
    /**
     * Minimum value of each component in this accessor. For example, minimum x, y, z components of a Vector3.
     */
    min?: [number] | Vector2 | Vector3 | Vector4 | Matrix3x3 | Matrix4x4,
    /**
     * Sparse storage of elements that deviate from their initialization value.
     */
    sparse?: AccessorSparse,
    /**
     * User-defined name of this object
     */
    name?: string,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data.
     */
    extras?: any
}

export type AccessorSparse = {
    /**
     * Number of deviating accessor values stored in the sparse array.
     */
    count: number
    /**
     * An object pointing to a buffer view containing the indices of deviating accessor values. The number of indices is equal to `count`. Indices *MUST* strictly increase.
     */
    indices: TODO,
    /**
     * An object pointing to a buffer view containing the deviating accessor values.
     */
    values: TODO,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data.
     */
    extras?: any
}

export type AccessorSparseIndices = {
    /**
     * The index of the buffer view with sparse indices. The referenced buffer view **MUST NOT** have its `target` or `byteStride` properties defined. The buffer view and the optional `byteOffset` **MUST** be aligned to the `componentType` byte length.
     */
    bufferView: number,
    /**
     * The offset relative to the start of the buffer view in bytes.
     */
    byteOffset?: number,
    /**
     * The indices data type. Valid values correspond to WebGL enums: `5121` (UNSIGNED_BYTE), `
     */
    componentType: AccessorComponentType,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data.
     */
    extras?: any
}

// ------------------------------- Buffer ------------------------------

export type Buffer = {
    /**
     * The uri of the buffer
     */
    uri?: string,
    /**
     * The length of the buffer in bytes
     */
    byteLength: number,
    /**
     * The user-defined name of this object
     */
    name?: string,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data
     */
    extras?: any
}

export type BufferView = {
    /**
     * The index of the buffer
     */
    buffer: number,
    /**
     * The offset into the buffer in bytes
     */
    byteOffset?: number,
    /**
     * The length of the bufferView in bytes
     */
    byteLength: number,
    /**
     * The stride, in bytes
     */
    byteStride?: number,
    /**
     * Hint representing the target that the GPU buffer should be bound to
     */
    target?: BufferViewTarget,
    /**
     * The user-defined name of this object
     */
    name?: string,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data
     */
    extras?: any
}

export enum BufferViewTarget {
    ARRAY_BUFFER = 34962,
    ELEMENT_ARRAY_BUFFER = 34963,
}

// ----------------------------- Animation -----------------------------

export type AnimationChannelTargetPath =
    | "translation"
    | "rotation"
    | "scale"
    | "weights"

export type AnimationChannelTarget = {
    /**
     * The index of the node to animate
     */
    node?: number,
    /**
     * The name of the node's TRS property to modify, or the weights of the Morph Targets it instantiates
     */
    path: AnimationChannelTargetPath,
}

export type AnimationChannel = {
    /**
     * The index of a sampler in this animation used to compute the value for the target
     */
    sampler: number,
    /**
     * The index of the node and TRS property to target
     */
    target: AnimationChannelTarget,
}

export type AnimationSampler = {
    /**
     * The index of an accessor containing keyframe input values, e.g., time
     */
    input: number,
    /**
     * Interpolation algorithm
     */
    interpolation?: AnimationSamplerInterpolation,
    /**
     * The index of an accessor, containing keyframe output values
     */
    output: number,
}

export type AnimationSamplerInterpolation =
    | "LINEAR"
    | "STEP"
    | "CUBICSPLINE"

export type Animation = {
    /**
     * An array of animation channels. An animation channel combines an animation sampler with a target property being animated. Different channels of the same animation **MUST NOT** have the same targets.
     */
    channels: AnimationChannel[],
    /**
     * An array of animation samplers. An animation sampler combines timestamps with a sequence of output values and defines an interpolation algorithm.
     */
    samplers: AnimationSampler[],
    /**
     * User-defined name of this object
     */
    name?: string,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data.
     */
    extras?: any
}

// ------------------------------ Texture ------------------------------

export enum TextureWrapMode {
    CLAMP_TO_EDGE = 33071,
    MIRRORED_REPEAT = 33648,
    REPEAT = 10497,
}

export enum TextureMagFilter {
    NEAREST = 9728,
    LINEAR = 9729,
}

export enum TextureMinFilter {
    NEAREST = 9728,
    LINEAR = 9729,
    NEAREST_MIPMAP_NEAREST = 9984,
    LINEAR_MIPMAP_NEAREST = 9985,
    NEAREST_MIPMAP_LINEAR = 9986,
    LINEAR_MIPMAP_LINEAR = 9987,
}

export type Texture = {
    /**
     * The index of the sampler used by this texture. When undefined, a sampler with repeat wrapping and auto filtering should be used
     */
    sampler?: number,
    /**
     * The index of the image used by this texture
     */
    source?: number,
    /**
     * The user-defined name of this object
     */
    name?: string,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data
     */
    extras?: any
}

export type TextureInfo = {
    /**
     * The index of the texture
     */
    index: number,
    /**
     * The set index of texture's TEXCOORD attribute used for texture coordinate mapping
     */
    texCoord?: number,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data
     */
    extras?: any
}

// ------------------------------- Image -------------------------------

export type ImageMimeType =
    | "image/jpeg"
    | "image/png"

export type Image = {
    /**
     * The user-defined name of this object
     */
    name?: string,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data
     */
    extras?: any
} & ({
    uri: string
} | {
    /**
     * The image's MIME type. Required if `bufferView` is defined.
     */
    mimeType: ImageMimeType,
    /**
     * The index of the bufferView that contains the image. This field **MUST NOT** be defined when `uri` is defined
     */
    bufferView: number,
})

// ------------------------------ Sampler ------------------------------

export type Sampler = {
    /**
     * Magnification filter. Valid values correspond to WebGL enums: 9728 (NEAREST) and 9729 (LINEAR)
     */
    magFilter?: TextureMagFilter,
    /**
     * Minification filter.  All valid values correspond to WebGL enums
     */
    minFilter?: TextureMinFilter,
    /**
     * S (U) wrapping mode.  All valid values correspond to WebGL enums
     */
    wrapS?: TextureWrapMode,
    /**
     * T (V) wrapping mode.  All valid values correspond to WebGL enums
     */
    wrapT?: TextureWrapMode,
}


// ------------------------------ Material -----------------------------

export type Material = {
    /**
     * A set of parameter values that are used to define the metallic-roughness material model from Physically-Based Rendering (PBR) methodology.
     */
    pbrMetallicRoughness?: MaterialPbrMetallicRoughness,
    /**
     * The tangent space normal texture
     */
    normalTexture?: MaterialNormalTextureInfo,
    /**
     * The occlusion texture
     */
    occlusionTexture?: MaterialOcclusionTextureInfo,
    /**
     * The emissive texture
     */
    emissiveTexture?: TextureInfo,
    /**
     * The emissive color of the material. RGB components between 0 and 1. Default is `[0, 0, 0]`.
     */
    emissiveFactor?: Vector3,
    /**
     * The alpha rendering mode of the material
     */
    alphaMode?: MaterialAlphaMode,
    /**
     * The alpha cutoff value of the material. Value between 0 and 1.
     */
    alphaCutoff?: number,
    /**
     * Specifies whether the material is double sided
     */
    doubleSided?: boolean,
    /**
     * The user-defined name of this object
     */
    name?: string,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data
     */
    extras?: any
}

export type MaterialOcclusionTextureInfo = {
    /**
     * The index of the texture
     */
    index: number,
    /**
     * The scalar multiplier applied to each occlusion value
     */
    strength?: number,
    /**
     * The set index of texture's TEXCOORD attribute used for texture coordinate mapping
     */
    texCoord?: number,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data
     */
    extras?: any
}

export type MaterialAlphaMode =
    | "OPAQUE"
    | "MASK"
    | "BLEND"

export type MaterialPbrMetallicRoughness = {
    /**
     * The material's base color factor. RGBA components between 0 and 1.
     */
    baseColorFactor?: Vector4,
    /**
     * The base color texture
     */
    baseColorTexture?: TextureInfo,
    /**
     * The metalness of the material
     */
    metallicFactor?: number,
    /**
     * The roughness of the material
     */
    roughnessFactor?: number,
    /**
     * The metallic-roughness texture
     */
    metallicRoughnessTexture?: TextureInfo,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data
     */
    extras?: any
}

export type MaterialNormalTextureInfo = {
    /**
     * The index of the texture
     */
    index: number,
    /**
     * The scalar multiplier applied to each normal vector of the texture
     */
    scale?: number,
    /**
     * The set index of texture's TEXCOORD attribute used for texture coordinate mapping
     */
    texCoord?: number,
    /**
     * The index of the texture coordinate set used for texture coordinate mapping
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data
     */
    extras?: any
}

// ------------------------------ Camera -------------------------------

export type CameraOrthographic = {
    /**
     * The floating-point horizontal magnification of the view. Must not be zero
     */
    xmag: number,
    /**
     * The floating-point vertical magnification of the view. Must not be zero
     */
    ymag: number,
    /**
     * The floating-point distance to the far clipping plane. zfar must be greater than znear
     */
    zfar: number,
    /**
     * The floating-point distance to the near clipping plane
     */
    znear: number,
}

export type CameraPerspective = {
    /**
     * The floating-point aspect ratio of the field of view
     */
    aspectRatio?: number,
    /**
     * The floating-point vertical field of view in radians
     */
    yfov: number,
    /**
     * The floating-point distance to the far clipping plane
     */
    zfar?: number,
    /**
     * The floating-point distance to the near clipping plane
     */
    znear: number,
}

export type Camera =
    | { type: "perspective", perspective: CameraPerspective }
    | { type: "orthographic", orthographic: CameraOrthographic }

// -------------------------------- Mesh -------------------------------

export enum MeshPrimitiveMode {
    POINTS = 0,
    LINES = 1,
    LINE_LOOP = 2,
    LINE_STRIP = 3,
    TRIANGLES = 4,
    TRIANGLE_STRIP = 5,
    TRIANGLE_FAN = 6,
}

export type MeshPrimitiveAttributes = {
    POSITION: number,
    TEXCOORD_0?: number,
    TEXCOORD_1?: number,
    NORMAL?: number
    COLOR_0?: number,
    JOINTS_0?: number,
    WEIGHTS_0?: number,
    TANGENT?: number,
}

export type MeshPrimitive = {
    /**
     * A dictionary object, where each key corresponds to mesh attribute semantic and each value is the index of the accessor containing attribute's data.
     */
    attributes: MeshPrimitiveAttributes
    /**
     * The index of the accessor that contains the vertex indices.
     */
    indices?: number,
    /**
     * The index of the material to apply to this primitive when rendering.
     */
    material?: number,
    /**
     * The topology type of primitives to render.
     */
    mode?: MeshPrimitiveMode,
    /**
     * An array of Morph Targets.
     */
    targets?: number[],
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data.
     */
    extras?: any
}

export type Mesh = {
    /**
     * An array of primitives, each defining geometry to be rendered.
     */
    primitives: MeshPrimitive[],
    /**
     * Array of weights to be applied to the morph targets. The number of array elements **MUST** match the number of morph targets.
     */
    weights?: number[],
    /**
     * The user-defined name of this object
     */
    name?: string,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data
     */
    extras?: any
}


// -------------------------------- Skin -------------------------------

export type Skin = {
    /**
     * The index of the accessor containing the floating-point 4x4 inverse-bind matrices. The default is that each matrix is a 4x4 identity matrix, which implies that inverse-bind matrices were pre-applied
     */
    inverseBindMatrices?: number,
    /**
     * The index of the node used as a skeleton root. When undefined, joints transforms resolve to scene root
     */
    skeleton?: number,
    /**
     * Indices of skeleton nodes, used as joints in this skin. The array length must be the same as the count property of the inverseBindMatrices accessor (when defined)
     */
    joints: number[],

    name?: string,
}

// ------------------------------- Node --------------------------------

/**
 * A node in the node hierarchy.  When the node contains `skin`, all `mesh.primitives` **MUST** contain `JOINTS_0` and `WEIGHTS_0` attributes.  A node **MAY** have either a `matrix` or any combination of `translation`/`rotation`/`scale` (TRS) properties. TRS properties are converted to matrices and postmultiplied in the `T * R * S` order to compose the transformation matrix, first the scale is applied to the vertices, then the rotation, and then the translation. If none are provided, the transform is the identity. When a node is targeted for animation (referenced by an animation.channel.target), `matrix` **MUST NOT** be present.
 */
export type Node = {
    /**
     * The index of the camera referenced by this node.
     */
    camera?: number,
    /**
     * The indices of this node's children.
     */
    children?: number[],
    /**
     * The index of the skin referenced by this node.
     */
    skin?: number,
    /**
     * A floating-point 4x4 transformation matrix stored in column-major order.
     */
    matrix?: Matrix4x4,
    /**
     * The index of the mesh in this node.
     */
    mesh?: number,
    /**
     * The node's unit quaternion rotation in the order (x, y, z, w), where w is the scalar.
     */
    rotation?: Vector4,
    /**
     * The node's non-uniform scale, given as the scaling factors along the x, y, and z axes.
     */
    scale?: Vector3,
    /**
     * The node's translation along the x, y, and z axes.
     */
    translation?: Vector3,
    /**
     * The weights of the instantiated morph target. The number of array elements **MUST** match the number of morph targets of the referenced mesh. When defined, `mesh` **MUST** also be defined.
     */
    weights?: number[],
    /**
     * The user-defined name of this object.
     */
    name?: string,
    /**
     * Object with extension-specific objects.
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data.
     */
    extras?: any
}


// ------------------------------- Scene -------------------------------

export type Scene = {
    /**
     * The indices of each root node
     */
    nodes: number[],
    name?: string,
}


// ------------------------------ Header ------------------------------

/**
 * The root object for a glTF asset
 */
export type GLTF = {
    /**
     * Names of glTF extensions used in this asset
     */
    extensionsUsed?: string[],
    /**
     * Names of glTF extensions required to properly load this asset
     */
    extensionsRequired?: string[],
    /**
     * Array of all accessors
     */
    accessors?: Accessor[],
    /**
     * Array of all keyframe animations
     */
    animations?: Animation[],
    /**
     * Array of all buffers
     */
    buffers?: Buffer[],
    /**
     * Array of all bufferViews
     */
    bufferViews?: BufferView[],
    /**
     * Array of all cameras
     */
    cameras?: Camera[],
    /**
     * Array of all images
     */
    images?: Image[],
    /**
     * Array of all materials
     */
    materials?: Material[],
    /**
     * Array of all meshes
     */
    meshes?: Mesh[],
    /**
     * Array of all nodes
     */
    nodes?: Node[],
    /**
     * Array of all samplers
     */
    samplers?: Sampler[],
    /**
     * Array of all scenes
     */
    scenes?: Scene[],
    /**
     * Index of the default scene
     */
    scene?: number,
    /**
     * Array of all skins
     */
    skins?: Skin[],
    /**
     * Array of all textures
     */
    textures?: Texture[],
    /**
     * The asset that generated this glTF file
     */
    asset: Asset,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data
     */
    extras?: any
}

export type Asset = {
    /**
     * A copyright message suitable for display to credit the content creator.
     */
    copyright?: string,
    /**
     * Tool that generated this glTF model. Useful for debugging
     */
    generator?: string,
    /**
     * The glTF version that this asset targets in the form `<major>.<minor>`
     */
    version: string,
    /**
     * The minimum glTF version that this asset targets in the form `<major>.<minor>`
     */
    minVersion?: string,
    /**
     * Object with extension-specific objects
     */
    extensions?: Record<string, any>,
    /**
     * Application-specific data
     */
    extras?: any
}