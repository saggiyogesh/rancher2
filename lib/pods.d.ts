export interface IPods {
    projectId: string;
    restartPolicy: string;
    namespaceId: string;
    scale: number;
    state: string;
    labels: {};
    name: string;
    type?: string;
    id: string;
    baseType: string;
    uuid: string;
    transitioning: string;
    transitioningMessage: string;
    status: {
        conditions: {
            lastProbeTime: null;
            lastTransitionTime: string;
            lastTransitionTimeTS: number;
            message: string;
            reason: string;
            status: string;
            type: string;
        }[];
        phase: string;
        qosClass: string;
        type: string;
    };
}
export declare function getAll(projectName: string, type: string): Promise<IPods[]>;
export declare function get(projectName: string, id: string): Promise<IPods>;
