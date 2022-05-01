declare const process: Process;

interface Process {
    env: Env
}
interface Env {
    username: string;
    password: string;
}
interface GlobalEnvironment {
    process: Process
}
