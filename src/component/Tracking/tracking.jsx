import Tree from 'react-tree-graph';

.red-node {
    fill: red;
    stroke: red;
}

const data = {
    name: 'Parent',
    children: [{
        name: 'Child One'
    }, {
        name: 'Child Two',
        gProps: {
            className: 'red-node',
            onClick: (event, node) =>
                alert(`Clicked ${node}!`)
        }
    }]
};

<Tree
    data={data}
    height={200}
    width={400}/>