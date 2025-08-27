import styles from './styles.module.css';

type DefaultInputProps = {
    id: string;
    labeltext?: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({labeltext, id, type, ...rest}: DefaultInputProps) {
    return(
        <>
            {/* {labeltext && <label htmlFor={id}>{labeltext}</label>} */}
            <label htmlFor={id}>{labeltext}</label>
            <input className={styles.input} type={type} id={id} {...rest} />
        </>
    )
}