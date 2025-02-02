import React from "react";

import * as N from "../../libraries/explorer-wamp/nodes";
import { NodeConsumer } from "../../context/NodeProvider";

import ProposalRow from "./ProposalRow";
import PaginationSpinner from "../utils/PaginationSpinner";

class Proposals extends React.Component {
  render() {
    return (
      <NodeConsumer>
        {(context) => (
          <>
            {context.proposals ? (
              context.proposals.map((node: N.Proposal) => (
                <ProposalRow key={node.account_id} node={node} />
              ))
            ) : (
              <PaginationSpinner hidden={false} />
            )}
          </>
        )}
      </NodeConsumer>
    );
  }
}

export default Proposals;
