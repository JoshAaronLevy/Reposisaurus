// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { ProductService } from '../service/ProductService';

// const RepositoryTable = () => {
// 	const [repos, setProducts] = useState([]);
// 	const productService = new ProductService();

// 	useEffect(() => {
// 		productService.getProductsSmall().then(data => setProducts(data));
// 	}, []); // eslint-disable-line react-hooks/exhaustive-deps

// 	return (
// 		<div>
// 			<div className="card">
// 				<DataTable value={repos} header="Stack" responsiveLayout="stack" breakpoint="960px">
// 					<Column field="code" header="Code" />
// 					<Column field="name" header="Name" />
// 					<Column field="category" header="Category" />
// 					<Column field="quantity" header="Quantity" />
// 				</DataTable>
// 			</div>
// 		</div>
// 	);
// }

// export default RepositoryTable;