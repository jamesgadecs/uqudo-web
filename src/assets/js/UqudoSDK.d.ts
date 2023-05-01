/** ------------------ UqudoSdk ---------------------------- **/

declare interface IUqudoSdkConfig {
  baseURL?: string;
  accessToken: string;
  nonce?: string;
  userId?: string;
  sessionId?: string;
  assets?: IAssetsArg;
  texts?: ITextsArg;
}

declare class UqudoSdk {
  enrollment(configProcess: IEnrollmentConfig): Promise<ReturnEnrollmentType>;
  accountRecovery(
    configProcess: IAccountRecoveryConfig
  ): Promise<ReturnAccountRecoveryType>;
  faceSession(
    configProcess: IFaceSessionConfig
  ): Promise<ReturnFaceSessionType>;
}

declare class UqudoSdkFactory {
  static create(config: IUqudoSdkConfig): UqudoSdk;
}

/** ------------------ Enrollment ---------------------------- **/

declare interface IEnrollmentConfig {
  scan: {
    documentType: DocumentType;
    disableExpiryValidation?: boolean;
    forceUpload?: boolean;
  };
  face?: {
    enableFacialRecognition?: boolean;
    enrollFace?: boolean;
  };
  backgroundCheck?: {
    enableBackgroundCheck?: boolean;
    checkType?: BackgroundCheckType;
    disableConsent?: boolean;
    skipView?: boolean;
    enableMonitoring?: boolean;
  };
  onSuccess?: (result: ReturnEnrollmentType) => void;
  onError?: (error: OperationError) => void;
  onFinally?: () => void;
  assets?: IAssetsArg;
  texts?: ITextsArg;
}

declare type ReturnEnrollmentType = string;

/** ------------------ Account Recovery ---------------------------- **/

declare interface IAccountRecoveryConfig {
  enrollmentIdentifier: string;
  onSuccess?: (result: ReturnAccountRecoveryType) => void;
  onError?: (error: OperationError) => void;
  onFinally?: () => void;
  assets?: IAssetsArg;
  texts?: ITextsArg;
}

declare type ReturnAccountRecoveryType = string;

/** ------------------ Face Session ---------------------------- **/

declare interface IFaceSessionConfig {
  sessionId: string;
  onSuccess?: (result: ReturnFaceSessionType) => void;
  onError?: (error: OperationError) => void;
  onFinally?: () => void;
  assets?: IAssetsArg;
  texts?: ITextsArg;
}

declare type ReturnFaceSessionType = string;

/** ------------------ Errors ---------------------------- **/

declare enum ErrorCode {
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  SESSION_EXPIRED_OR_NOT_FOUND = 'SESSION_EXPIRED_OR_NOT_FOUND',
  MEDIA_NOT_ALLOWED_ERROR = 'MEDIA_NOT_ALLOWED_ERROR',
  MEDIA_NOT_FOUND_ERROR = 'MEDIA_NOT_FOUND_ERROR',
  MEDIA_SECURITY_ERROR = 'MEDIA_SECURITY_ERROR',
  MEDIA_UNKNOWN_ERROR = 'MEDIA_UNKNOWN_ERROR',
  USER_CANCEL = 'USER_CANCEL',
  INVALID_CONFIG = 'INVALID_CONFIG',
  SESSION_INVALIDATED_TOO_MANY_ATTEMPTS = 'SESSION_INVALIDATED_TOO_MANY_ATTEMPTS',
}

declare class OperationError extends Error {
  code: ErrorCode;
  constructor(code: ErrorCode, message?: string);
}

declare const isOperationError: (error: unknown) => error is OperationError;

/** ------------------ Background Check ---------------------------- **/

declare enum BackgroundCheckType {
  RDC = 'RDC',
}

/** ------------------ Document Type ---------------------------- **/

declare class DocumentType {
  readonly type: string;
  readonly singleSide: boolean;
  readonly facialRecognitionSupported: boolean;
  static readonly BHR_ID: DocumentType;
  static readonly GENERIC_ID: DocumentType;
  static readonly KWT_ID: DocumentType;
  static readonly OMN_ID: DocumentType;
  static readonly PAK_ID: DocumentType;
  static readonly PASSPORT: DocumentType;
  static readonly SAU_ID: DocumentType;
  static readonly UAE_ID: DocumentType;
  static readonly UAE_DL: DocumentType;
  static readonly NLD_DL: DocumentType;
  static readonly UAE_VISA: DocumentType;
  static readonly UAE_VL: DocumentType;
  static readonly QAT_ID: DocumentType;
  static readonly DEU_ID: DocumentType;
  static readonly SDN_ID: DocumentType;
  static readonly SDN_DL: DocumentType;
  static readonly SDN_VL: DocumentType;
  static readonly GHA_ID: DocumentType;
  static readonly NGA_DL: DocumentType;
  static readonly NGA_VOTER_ID: DocumentType;
  static readonly NGA_NIN: DocumentType;
  static readonly UAE_VL_PDF: DocumentType;
  static readonly GBR_DL: DocumentType;
  static readonly SAU_DL: DocumentType;
  static readonly ZAF_ID: DocumentType;
  static readonly ZAF_DL: DocumentType;
  static readonly EGY_ID: DocumentType;
  static readonly RWA_ID: DocumentType;
  static readonly KEN_ID: DocumentType;
  static get values(): DocumentType[];
  static fromString(documentTypeString: string): DocumentType;
}

/** ------------------ Texts ---------------------------- **/

declare interface ITextsArg {
  startingCamera?: string;
  validating?: string;
  processing?: string;
  exit?: {
    title?: string;
    description?: string;
    yesButtonText?: string;
    noButtonText?: string;
  };
  upload?: {
    title?: string;
    front?: {
      description: string;
      buttonText?: string;
    };
    back?: {
      description: string;
      buttonText?: string;
    };
    acceptedFilesDescription: string;
    buttonText?: string;
    tipDescription: string;
  };
  backgroundCheck?: {
    title?: string;
    description: string;
    declineButtonText?: string;
    consentButtonText?: string;
    continueButtonText?: string;
    declineConfirmation?: {
      title?: string;
      description?: string;
      noButtonText?: string;
      yesButtonText?: string;
    };
  };
  facialRecognition?: {
    title?: string;
    description?: string;
    headText?: string;
  };
  scan?: {
    titleFrontSide?: string;
    titleBackSide?: string;
    rescanButtonText?: string;
    continueButtonText?: string;
    turnDocumentDescription?: string;
    tipDescription?: string;
    tipDescription2?: string;
    description: string;
  };
  documentTypes?: Record<string, string>;
  errors?: {
    SCAN_DOCUMENT_NOT_RECOGNIZED?: {
      title?: string;
      description: string;
      button?: string;
    };
    SCAN_DOCUMENT_EXPIRED?: {
      title?: string;
      description?: string;
      button?: string;
    };
    SCAN_DOCUMENT_FRONT_BACK_MISMATCH?: {
      title?: string;
      description?: string;
      button?: string;
    };
    FACE_LIVENESS_FAILED?: {
      title?: string;
      description: string;
      button?: string;
    };
    FACE_NO_MATCH?: {
      title?: string;
      description: string;
      button?: string;
    };
    UNEXPECTED_ERROR?: {
      title?: string;
      description?: string;
      button?: string;
    };
    PAYLOAD_TOO_LARGE?: {
      title?: string;
      description?: string;
      button?: string;
    };
  };
}

/** ------------------ Assets ---------------------------- **/

declare interface IAssetsArg {
  logo?: string;
  logoWhite?: string;
  turnOverImage?: string;
  headObj?: string;
  closeSessionIcon?: string;
  addFileIcon?: string;
  hintIcon?: string;
  recordIcon?: string;
  takePictureIcon?: string;
  spinnerIcon?: string;
  removeIcon?: string;
  updateIcon?: string;
}

export {
  DocumentType,
  BackgroundCheckType,
  OperationError,
  ErrorCode,
  isOperationError,
};

export type {
  ReturnEnrollmentType,
  ReturnAccountRecoveryType,
  ReturnFaceSessionType,
  IUqudoSdkConfig,
  IFaceSessionConfig,
  IEnrollmentConfig,
  IAccountRecoveryConfig,
  IAssetsArg,
  ITextsArg,
  UqudoSdk,
};

export default UqudoSdkFactory;
