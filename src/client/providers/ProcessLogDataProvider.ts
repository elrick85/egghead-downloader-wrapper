/**
 * Created by zauri_000 on 20.03.2017.
 */

export interface IStep {
    message: string;

    status?: StepStatus;

    additional?: any;
}

export enum StepStatus{
    ERROR,
    SUCCESS
}

export class ProcessLogDataProvider {
    getLog(): Promise<IStep[]> {
        return Promise.resolve([
            {message: "test1", status: StepStatus.ERROR},
            {message: "test2", status: StepStatus.SUCCESS},
            {message: "test3", status: StepStatus.SUCCESS},
            {message: "test4", status: StepStatus.ERROR},
            {message: "test5", status: StepStatus.SUCCESS}
        ])
    }

    createStepFromMessage(message: string): IStep {
        return {message: message} as IStep;
    }

    getProcess(cb: Function) {

    }
}