

import React, { useState } from 'react';

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div>
    <label>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onCheckboxChange}
      />
      {label}
    </label>
  </div>
);

const ParentCheckbox = () => {
  const [isParentSelected, setIsParentSelected] = useState(false);
  
  const [childCheckboxes, setChildCheckboxes] = useState([
    {
      id: 1,
      label: 'Child 1',
      isSelected: false,
      grandchildren: [
        { id: 1.1, label: 'Grandchild 1.1', isSelected: false },
        { id: 1.2, label: 'Grandchild 1.2', isSelected: false },
      ],
    },
    {
      id: 2,
      label: 'Child 2',
      isSelected: false,
      grandchildren: [
        { id: 2.1, label: 'Grandchild 2.1', isSelected: false },
        { id: 2.2, label: 'Grandchild 2.2', isSelected: false },
      ],
    },
    {
      id: 3,
      label: 'Child 3',
      isSelected: false,
      grandchildren: [
        { id: 3.1, label: 'Grandchild 3.1', isSelected: false },
        { id: 3.2, label: 'Grandchild 3.2', isSelected: false },
      ],
    },
  ]);

  const handleParentChange = () => {
    const newSelection = !isParentSelected;
    setIsParentSelected(newSelection);

    setChildCheckboxes(childCheckboxes.map(child => ({
      ...child,
      isSelected: newSelection,
      grandchildren: child.grandchildren.map(grandchild => ({
        ...grandchild,
        isSelected: newSelection,
      })),
    })));
  };

  const handleChildChange = (childId) => {
    const updatedChildren = childCheckboxes.map(child => {
      if (child.id === childId) {
        const newSelection = !child.isSelected;

        return {
          ...child,
          isSelected: newSelection,
          grandchildren: child.grandchildren.map(grandchild => ({
            ...grandchild,
            isSelected: newSelection,
          })),
        };
      }
      return child;
    });

    setChildCheckboxes(updatedChildren);
    const allSelected = updatedChildren.every(child => child.isSelected);
    setIsParentSelected(allSelected);
  };

  const handleGrandchildChange = (childId, grandchildId) => {
    const updatedChildren = childCheckboxes.map(child => {
      if (child.id === childId) {
        const updatedGrandchildren = child.grandchildren.map(grandchild => {
          if (grandchild.id === grandchildId) {
            return { ...grandchild, isSelected: !grandchild.isSelected };
          }
          return grandchild;
        });

        const allGrandchildrenSelected = updatedGrandchildren.every(grandchild => grandchild.isSelected);

        return {
          ...child,
          isSelected: allGrandchildrenSelected,
          grandchildren: updatedGrandchildren,
        };
      }
      return child;
    });

    setChildCheckboxes(updatedChildren);
    const allSelected = updatedChildren.every(child => child.isSelected);
    setIsParentSelected(allSelected);
  };

  return (
    <div>
      <Checkbox
        label="Parent"
        isSelected={isParentSelected}
        onCheckboxChange={handleParentChange}
      />
      {childCheckboxes.map(child => (
        <div key={child.id} style={{ marginLeft: '20px' }}>
          <Checkbox
            label={child.label}
            isSelected={child.isSelected}
            onCheckboxChange={() => handleChildChange(child.id)}
          />
          <div style={{ marginLeft: '20px' }}>
            {child.grandchildren.map(grandchild => (
              <Checkbox
                key={grandchild.id}
                label={grandchild.label}
                isSelected={grandchild.isSelected}
                onCheckboxChange={() => handleGrandchildChange(child.id, grandchild.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParentCheckbox;






{/*import React, { useState } from 'react';

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div>
    <label>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onCheckboxChange}
      />
      {label}
    </label>
  </div>
);

const ParentCheckbox = () => {
  const [isParentSelected, setIsParentSelected] = useState(false);
  const [childCheckboxes, setChildCheckboxes] = useState([
    { id: 1, label: 'Child 1', isSelected: false },
    { id: 2, label: 'Child 2', isSelected: false },
    { id: 3, label: 'Child 3', isSelected: false },
  ]);
   const [childrenCheckboxes, setChildrenCheckboxes] = useState([
    { id: 1, label: 'grandChild 1', isSelected: false },
    { id: 2, label: 'grandChild 2', isSelected: false },
    { id: 3, label: 'grandChild 3', isSelected: false },
  ])


  const handleParentChange = () => {
    const newSelection = !isParentSelected;
    setIsParentSelected(newSelection);
    setChildCheckboxes(childCheckboxes.map(child => ({
      ...child,
      isSelected: newSelection,
    })));
  };

  const handleChildChange = (id) => {
    const updatedChildren = childCheckboxes.map(child => {
      if (child.id === id) {
        return { ...child, isSelected: !child.isSelected };
      }
      return child;
    });

    setChildCheckboxes(updatedChildren);

    const allSelected = updatedChildren.every(child => child.isSelected);
    setIsParentSelected(allSelected);
  };

  return (
    <div>
      <Checkbox
        label="Parent"
        isSelected={isParentSelected}
        onCheckboxChange={handleParentChange}
      />
      {childCheckboxes.map(child => (
        <Checkbox
          key={child.id}
          label={child.label}
          isSelected={child.isSelected}
          onCheckboxChange={() => handleChildChange(child.id)}
        />
      ))}
    </div>
  );
};

export default ParentCheckbox;*/}


{/*

  const listOptions = [{
    title: 'parent1',
    child: ['parentchild1', 'parentchild2']
  },
    {
      title: 'parent2',
      child: ['parentchild1', 'parentchild2']
    },
    {
      title: 'parent3',
      child: ['parentchild1', 'parentchild2']
    },
  ];


  const [selected, setSelected] = useState([]);


  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(listOptions);
    } else {
      setSelected([]);
    }
  };


  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelected((prevSelected) => [...prevSelected, name]);
    } else {
      setSelected((prevSelected) =>
        prevSelected.filter((item) => item !== name)
      );
    }
  };





  return (
    <div>
      <h1>NESTED CHECKBOXES</h1>



      <Checkbox
        name="Select All"
        checked={selected.length === listOptions.length}
        onChange={handleSelectAll}
      />
      {listOptions.map((item) => (
        <Checkbox
          key={item.title}
          name={item.title}
          checked={selected.includes(item.title)}
          onChange={handleCheckboxChange}
        > {/*item.child.map((child) => {
          <Checkbox key={child} name={child} checked={selected.includes(child)} onChange={handleCheckboxChange}/>
        })}
        </Checkbox>
      ))}
    </div>
  );*/}
























{/*import React, { useState } from 'react';
const array =['ischecked','id']

function CheckBox({title,children,click,checked}) {
  return (
    <div>
      <input type="checkbox" name="" id="" onClick={click} checked={checked} />
      <label htmlFor="">{title}</label>
      {children}
    </div>
  )
}

const NestedCheckbox = () => {
  const [check, setChecked] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setthird] = useState(false);
  const [first, setfirst] = useState(false);
  const [thirdchilda, sethirdchilda] = useState(false);
  const [thirdchildb, sethirdchildb] = useState(false);
  const [secondchilda, setsecondchilda] = useState(false);
  const [secondchildb, setsecondchildb] = useState(false);
{/*for genral parents */
/* function checker() {
    setChecked(true);
     if (thirdc||secondc === false) {
     setChecked(false);
  }
  }

 function secondc() {
   setSecond(!second)
   if (thirdc === false) {
     setSecond(false);
   } else if (second===false) {
     setsecondchilda(false);
     setsecondchildb(false);
     setthird(false);
  }
  }



   function thirdc () {
     setthird(!third)
     if (third===false) {
       sethirdchilda(false);
         sethirdchildb(false);
     }
  }
  {/*for individual *}
  function thirdchild1() {
    sethirdchilda(!thirdchilda);
  }
   function thirdchild2() {
    sethirdchildb(!thirdchildb);
  }
  {/*second / }
   function secondchild1() {
    setsecondchilda(!secondchilda);
  }
   function secondchild2() {
    setsecondchildb(!secondchildb);
}


  return (
    <div>
      <CheckBox title={'parent1'} click={checker} checked={check}>
        <CheckBox title={'child1'} click={''} checked={check||first} />
        <CheckBox title={'child1'} click={''} checked={check} />
        



        <CheckBox title={'parent2'} click={secondc} checked={check||second}>
          <CheckBox title={'child1'} click={secondchild1} checked={check||second||secondchilda} />
          <CheckBox title={'child1'} click={secondchild2} checked={check||second||secondchildb} />
          



     <CheckBox title={'parent3'} click={thirdc} checked={check||third||second} >
            <CheckBox title={'child1'} click={thirdchild1} checked={check||third||second||thirdchilda} />
             <CheckBox title={'child2'} click={thirdchild2} checked={check||third||second||thirdchildb}/>
          </CheckBox>








         </CheckBox>
      </CheckBox>
      
    </div>
  )
}







export default NestedCheckbox



*/}