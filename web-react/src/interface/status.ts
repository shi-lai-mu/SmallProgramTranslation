export interface ColudPackgingInterface {
  status: boolean;
  packingCurrent: number;
  packStatus?: 'wait' | 'process' | 'finish' | 'error' | undefined;
}