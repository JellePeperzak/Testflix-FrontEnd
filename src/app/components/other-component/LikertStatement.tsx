
interface LikertStatementProps {
    statement: string;
    inputName: string;
    size?: number;
};

const LikertStatement: React.FC<LikertStatementProps> = ({ statement, inputName, size = 5 }) => {
    return (
        <div className="flex">
            <div>
                {statement}
            </div>
            <div>
                {Array.from({ length: size}).map((_, index) => (
                    <input 
                        key={index}
                        type="radio"
                        name={inputName}
                        value={index + 1}
                    />
                ))}
            </div>
        </div>
    );
};
export default LikertStatement;