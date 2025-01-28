export interface DataToStoreProps {
    // Meta Data
    time_start?: number;
    time_finish?: number;
    task1_start?: number;
    task1_finish?: number;
    task2_start?: number;
    task2_finish?: number;
    task3_start?: number;
    task3_finish?: number;
    condition_id?: number;
    first_task?: number;
    second_task?: number;
    third_task?: number;
    first_algorithm?: number;
    second_algorithm?: number;
    third_algorithm?: number;
    // Demographics Data
    age?: number;
    gender?: string;
    nationality?: string;
    experience?: number;
    consumption?: string;
    // Task Data
    task1_movie?: boolean;
    task1_series?: boolean;
    task1_search?: boolean;
    task2_movie?: boolean;
    task2_series?: boolean;
    task2_search?: boolean;
    task3_movie?: boolean;
    task3_series?: boolean;
    task3_search?: boolean;
    // Algorithm Data
    algorithm1_movie?: boolean;
    algorithm1_series?: boolean;
    algorithm1_search?: boolean;
    algorithm2_movie?: boolean;
    algorithm2_series?: boolean;
    algorithm2_search?: boolean;
    algorithm3_movie?: boolean;
    algorithm3_series?: boolean;
    algorithm3_search?: boolean;
    // Gratification Statement Data
    cn_1_1?: number;
    cn_1_2?: number;
    cn_1_3?: number;
    cn_2_1?: number;
    cn_2_2?: number;
    cn_2_3?: number;
    en_1_1?: number;
    en_1_2?: number;
    en_1_3?: number;
    se_1_1?: number;
    se_1_2?: number;
    se_1_3?: number;
    // Evaluation Data
    eval_1_1?: number;
    eval_1_2?: number;
    eval_1_3?: number;
    eval_2_1?: number;
    eval_2_2?: number;
    eval_2_3?: number;
    eval_3_1?: number;
    eval_3_2?: number;
    eval_3_3?: number;
    // Feedback Data
    feedback?: string;
}