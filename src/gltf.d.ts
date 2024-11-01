export type ID = number

const enum AccessorComponentType {
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

// TODO
export type Translation = [number, number, number]
export type Rotation = [number, number, number, number]
export type Scale = [number, number, number]
export type Matrix = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]


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
    input: number;
    /**
     * Interpolation algorithm
     */
    interpolation?: AnimationSamplerInterpolation;
    /**
     * The index of an accessor, containing keyframe output values
     */
    output: number;
}

export type AnimationSamplerInterpolation =
    | "LINEAR"
    | "STEP"
    | "CUBICSPLINE"

export type Animation = {
    /**
     * An array of animation channels. An animation channel combines an animation sampler with a target property being animated. Different channels of the same animation **MUST NOT** have the same targets.
     */
    "channels": AnimationChannel[];
    /**
     * An array of animation samplers. An animation sampler combines timestamps with a sequence of output values and defines an interpolation algorithm.
     */
    "samplers": AnimationSampler[];
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
    source: number;
}

// TODO: TextureInfo

// ------------------------------ Sampler ------------------------------

export type Sampler = {
    /**
     * Magnification filter.  Valid values correspond to WebGL enums: 9728 (NEAREST) and 9729 (LINEAR)
     */
    magFilter?: TextureMagFilter;
    /**
     * Minification filter.  All valid values correspond to WebGL enums
     */
    minFilter?: TextureMinFilter;
    /**
     * S (U) wrapping mode.  All valid values correspond to WebGL enums
     */
    wrapS?: TextureWrapMode;
    /**
     * T (V) wrapping mode.  All valid values correspond to WebGL enums
     */
    wrapT?: TextureWrapMode;
}


// ------------------------------ Material -----------------------------


// ------------------------------ Camera -------------------------------

export type CameraType =
    | "perspective"
    | "orthographic"

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

export type MeshPrimitiveMode = {} // TODO

export type MeshPrimitive = {
    /**
     * A plain JSON object, where each key corresponds to a mesh attribute semantic and each value is the index of the accessor containing attribute's data.
     */
    attributes: Record<string, number>,
    /**
     * The index of the accessor that contains the vertex indices.
     */
    indices?: number;
    /**
     * The index of the material to apply to this primitive when rendering.
     */
    material?: number;
    /**
     * The topology type of primitives to render.
     */
    mode?: MeshPrimitiveMode
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
     * TODO
     */
    name?: string,
}


// -------------------------------- Skin -------------------------------

export type Skin = {
    /**
     * The index of the accessor containing the floating-point 4x4 inverse-bind matrices.  The default is that each matrix is a 4x4 identity matrix, which implies that inverse-bind matrices were pre-applied
     */
    inverseBindMatrices?: number;
    /**
     * The index of the node used as a skeleton root. When undefined, joints transforms resolve to scene root
     */
    skeleton?: number;
    /**
     * Indices of skeleton nodes, used as joints in this skin.  The array length must be the same as the count property of the inverseBindMatrices accessor (when defined)
     */
    joints: number[];

    name?: string,
}

// ------------------------------- Node --------------------------------

/**
 * A node in the node hierarchy.  When the node contains `skin`, all `mesh.primitives` **MUST** contain `JOINTS_0` and `WEIGHTS_0` attributes.  A node **MAY** have either a `matrix` or any combination of `translation`/`rotation`/`scale` (TRS) properties. TRS properties are converted to matrices and postmultiplied in the `T * R * S` order to compose the transformation matrix; first the scale is applied to the vertices, then the rotation, and then the translation. If none are provided, the transform is the identity. When a node is targeted for animation (referenced by an animation.channel.target), `matrix` **MUST NOT** be present.
 */

// TODO type unions
export type Node = {
    /**
     * The index of the camera referenced by this node.
     */
    camera?: number;
    /**
     * The indices of this node's children.
     */
    children?: number[];
    /**
     * The index of the skin referenced by this node.
     */
    skin?: number;
    /**
     * A floating-point 4x4 transformation matrix stored in column-major order.
     */
    matrix?: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    /**
     * The index of the mesh in this node.
     */
    mesh?: number;
    /**
     * The node's unit quaternion rotation in the order (x, y, z, w), where w is the scalar.
     */
    rotation?: [number, number, number, number];
    /**
     * The node's non-uniform scale, given as the scaling factors along the x, y, and z axes.
     */
    scale?: [number, number, number];
    /**
     * The node's translation along the x, y, and z axes.
     */
    translation?: [number, number, number];
    /**
     * The weights of the instantiated morph target. The number of array elements **MUST** match the number of morph targets of the referenced mesh. When defined, `mesh` **MUST** also be defined.
     */
    weights?: number[];
    name?: string;
}


// ------------------------------- Scene -------------------------------

export type Scene = {
    /**
     * The indices of each root node
     */
    nodes: number[];
}


// ------------------------------- GLTF -------------------------------

/**
 * The root object for a glTF asset.
 */
export type GLTF = {
    // TODO
}


